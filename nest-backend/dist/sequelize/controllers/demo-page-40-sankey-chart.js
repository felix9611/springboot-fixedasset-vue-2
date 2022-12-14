"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interface_1 = require("modules/custom-backend/interface");
exports.default = new interface_1.CustomModule(async (load, user) => {
    return {
        card: {
            name: 'Demo Page 40 Sankey Chart',
            category: 'DEMO',
            component: {
                is: 'PlotlyCard',
                props: {
                    scrollable: false
                }
            },
            baseParams: {
                frontend: {
                    smooth: true
                },
                subqueries: {}
            },
            filters: {
                available: []
            }
        },
        jqls: [
            {
                type: 'postProcess',
                postProcess(params, req) {
                    return [
                        {
                            extraProps: true,
                            componentProps: {
                                type: 'sankey',
                                node: {
                                    pad: 15,
                                    thickness: 30,
                                    line: {
                                        color: 'yellow',
                                        width: 0.5
                                    },
                                    label: ['From CN', 'From UK', 'From FR', 'From VN', 'To CN', 'To UK', 'To FR', 'To VN'],
                                    color: ['blue', 'blue', 'blue', 'blue', 'green', 'green', 'green', 'green', 'green']
                                },
                                link: {
                                    source: [0, 1, 1, 3, 3, 2, 2, 0, 0],
                                    target: [6, 4, 6, 6, 4, 5, 4, 5, 7],
                                    value: [10, 20, 10, 50, 45, 28, 30, 25, 20]
                                }
                            }
                        }
                    ];
                }
            }
        ]
    };
});
//# sourceMappingURL=demo-page-40-sankey-chart.js.map