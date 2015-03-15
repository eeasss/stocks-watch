/**
 * Created by eeasss on 5/25/2014.
 */

(function ($, Storage) {
	"use strict";
	/*jslint browser: true, plusplus: true */
	/*global $, Storage */

	var baseUrl = "https://query.yahooapis.com/v1/public/yql";
    var offset = 8 + 8 + 8; // 8 saturdays, 8 sundays, assume 8 public holidays
    var params = {
        q: 'select * from yahoo.finance.historicaldata where symbol = "#ticker#" and startDate = "#start#" and endDate = "#end#"',
        format: "json",
        env: "store://datatables.org/alltableswithkeys",
        callback: "callback"
    };

	/* Utility functions */
	function date(offset) {
        var d = new Date();
        if (offset) {
            d.setDate(d.getDate() + offset);
        }

        return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    }

    function queryOptions(ticker) {
        return {
            ticker: ticker,
            start: date(-50 - offset),
            end: date()
        };
    }

	function avg(d) {
		var sum = 0;
		var i;

		for (i = 0; i < d.length; i++) {
			sum += d[i];
		}

		return sum / d.length;
	}

    /* Region Storage Extensions */
    Storage.prototype.setObject = function (key, value) {
        this.setItem(key, JSON.stringify(value));
    };

    Storage.prototype.getObject = function (key) {
        return JSON.parse(this.getItem(key));
    };
    /* End Region */

    var Request = function (baseUrl, options) {
        this.baseUrl = baseUrl;
        this.ticker = options.ticker;
        this.start = options.start;
        this.end = options.end;
    };

    Request.prototype = {
        get: function (options) {
            var that = this;

            $.ajax({
                url: this.baseUrl,
                dataType: "jsonp",
                jsonp: "callback",
                data: that.initializeQueryParams(options.data),
                cache: true
            })
			.done(options.success)
			.fail(options.fail);
        },
        initializeQueryParams: function (options) {
            options.q = options.q.replace("#ticker#", this.ticker)
                                 .replace("#start#", this.start)
                                 .replace("#end#", this.end);
            return options;
        }
    };

    var Technicals = {
		sharpe: function (d) {
			var dailyReturns = [];
			var avgOfDailyReturns;
	        var differences = [];
			var squareDiffs;
			var avgSquareDiff;
			var i;

			if (!d || d.length === 0) {
				return 0;
            }

			for (i = 1; i < d.length; i++) {
				var today = d[i];
				var yesterday = d[i - 1];

				dailyReturns.push((today.Adj_Close/yesterday.Adj_Close) - 1);
			}

			avgOfDailyReturns = avg(dailyReturns);

			squareDiffs = dailyReturns.map(function (value) {
				var diff = value - avgOfDailyReturns;
				var sqr = diff * diff;
				return sqr;
			});

			avgSquareDiff = avg(squareDiffs);
			var stdDev = Math.sqrt(avgSquareDiff);
			return Math.sqrt(50) * (avgOfDailyReturns / stdDev);
		},
        average: {
            fifty: function (d) {
                if (!d || d.length === 0) {
                    return 0;
                }

                var sum = 0;

                for (var i = 0; i < d.length; i++) {
                    if (i == 50) {
                        break;
                    }

                    sum += parseFloat(d[i].Close);
                }

                return (sum / 50).toFixed(2);
            },
            displaced: {
                twentyFiveByFive: function (d) {
                    if (!d || d.length === 0) {
                        return 0;
                    }

                    var sum = 0;
					
                    for (var i = 5; i < 30; i++) {
     
                        sum += parseFloat(d[i].Close);
                    }

                    return (sum / 25).toFixed(2);
                }
            }
        },
        result: {
            portfolio:[],
            ndaq100: [],
			follow: []
        },
        rawData: {}
    };

    var TechnicalsProvider = function (options) {
        this.tickers = options.tickers;
        this.name = options.name;
        this.current = "";
        this.index = 0;
        this.callback = options.done;
    };

    TechnicalsProvider.prototype = {
        calculate: function () {
            for (var i = 0; i < this.tickers.length; i++) {
                var ticker = this.tickers[i];
                var data = this.rawData(ticker);
				
				if (data) {
					var result = {
						fifty: Technicals.average.fifty(data),
						twentyFive: Technicals.average.displaced.twentyFiveByFive(data),
						sharpe: Technicals.sharpe(data),
						lastClose: data[0].Close
					};

					result.above25 = parseFloat(result.lastClose) > parseFloat(result.twentyFive);
					result.above50 = parseFloat(result.lastClose) > parseFloat(result.fifty);
					result.spread25 = (((result.lastClose / result.twentyFive) - 1) * 100).toFixed(2);
					result.spread50 = (((result.lastClose / result.fifty) - 1) * 100).toFixed(2);
				
					Technicals.result[this.name].push($.extend(result, { ticker: ticker }));
				}
			}
        },
        rawData: function (id) {
            return Technicals.rawData[id];
        },
        storage: function (options) {
            if (options.data) {
                localStorage.setObject(options.ticker, options.data);
            } else {
                return localStorage.getObject(options.ticker);
            }
        },
        request: function () {
            if (localStorage.getItem(this.name + "hasQuotes")) {
                var tickers = this.tickers;

                for (var i = 0; i < tickers.length; i++) {
                    var rawData = this.storage({ticker: tickers[i]});

                    if (rawData) {
                        Technicals.rawData[tickers[i]] = rawData;
                    }
                }

                this.done();
            } else {
                this.send();
            }
        },
        send: function () {
            var that = this;
            var tickers = this.tickers.slice();

            if (tickers.length && this.index < tickers.length) {
                that.current = tickers[this.index];
                this.index++;

                var r = new Request(baseUrl, queryOptions(that.current));
                r.get({ success: $.proxy(that.success, that), fail: function() {}, data: $.extend({}, params) });
            } else {
                this.done();
            }
        },
        success: function () {
            if (arguments && arguments[0].query.results) {
                var data = arguments[0].query.results.quote;
                this.storage({ticker: this.current, data: data})
                Technicals.rawData[this.current] = data;
            }
            this.request();
        },
        done: function () {
            this.set();
            this.callback.call();
        },
        set: function () {
            localStorage.setItem(this.name + "hasQuotes", true);
        },
        reset: function () {
            localStorage.clear();
        }
    };

    /* Expose to global scope */
	window.Request = Request;
	window.Technicals = Technicals;
	window.TechnicalsProvider = TechnicalsProvider;

})(window.jQuery, window.Storage);