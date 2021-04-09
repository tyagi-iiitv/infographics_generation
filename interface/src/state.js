let fourWorldFacts = `# 1
## USA
 The United States has maintained its position of being the world’s largest economy since 1871
![](images/usa.svg)

# 2
## China
 In China, the dragons are associated with wealth, power, and leadership
![](images/china.svg)

# 3
## India
 It's estimated that between 15% and 30% of India's population follow a strict vegetarian diet
![](images/india.svg)

# 4
## Russia
 Russia is 60% forest. What’s more interesting, half of that forest is totally uninhabited by humans.
![](images/russia.svg)`;

let fiveWorldFacts = `# 1
## USA
 The United States has maintained its position of being the world’s largest economy since 1871
![](images/usa.svg)

# 2
## China
 In China, the dragons are associated with wealth, power, and leadership
![](images/china.svg)

# 3
## India
 It's estimated that between 15% and 30% of India's population follow a strict vegetarian diet
![](images/india.svg)

# 4
## Russia
 Russia is 60% forest. What’s more interesting, half of that forest is totally uninhabited by humans.
![](images/russia.svg)

# 5
## Brazil
 Brazil has won more football world cups than any other country, with Pele being the top scorer
![](images/brazil.svg)`;

let fourBill = `#
## Jeff B.
 Jeffrey Preston Bezos is an American internet entrepreneur, industrialist, media proprietor, and investor.
![](images/jeff.svg)

#
## Elon M.
 Elon Reeve Musk FRS is a business magnate, industrial designer, and engineer.
![](images/elon.svg)

#
## Bernard A.
 Bernard Jean Étienne Arnault is a French billionaire businessman and art collector.
![](images/bernard.svg)

#
## Bill G.
 William Henry Gates III is an American business magnate, software developer, investor,author, philanthropist.
![](images/bill.svg)`;

let fiveBill = `#
## Jeff B.
 Jeffrey Preston Bezos is an American internet entrepreneur, industrialist, media proprietor, and investor.
![](images/jeff.svg)

#
## Elon M.
 Elon Reeve Musk FRS is a business magnate, industrial designer, and engineer.
![](images/elon.svg)

#
## Bernard A.
 Bernard Jean Étienne Arnault is a French billionaire businessman and art collector.
![](images/bernard.svg)

#
## Bill G.
 William Henry Gates III is an American business magnate, software developer, investor,author, philanthropist.
![](images/bill.svg)

#
## Mark Z.
Mark Elliot Zuckerberg is an American media magnate, entrepreneur, and philanthrophist.
![](images/mark.svg)`;

let fourOlympics = `# London
## 2012
 The 2012 Summer Olympics consisted of 302 events in 26 sports (39 disciplines)
![](images/london.svg)

# Sochi
## 2014
 The 2014 Winter Olympics consisted of 98 events in 7 sports (15 disciplines)
![](images/sochi.svg)

# Rio
## 2016
 The 2016 Summer Olympics consisted of 306 events in 28 sports (41 disciplines)
![](images/rio.svg)

# PyeongChang
## 2018
 The 2018 Winter Olympics consisted of 102 events in 7 sports (15 disciplines)
![](images/pyeongchang.svg)`;

let fiveOlympics = `# London
## 2012
 The 2012 Summer Olympics consisted of 302 events in 26 sports (39 disciplines)
![](images/london.svg)

# Sochi
## 2014
 The 2014 Winter Olympics consisted of 98 events in 7 sports (15 disciplines)
![](images/sochi.svg)

# Rio
## 2016
 The 2016 Summer Olympics consisted of 306 events in 28 sports (41 disciplines)
![](images/rio.svg)

# PyeongChang
## 2018
 The 2018 Winter Olympics consisted of 102 events in 7 sports (15 disciplines)
![](images/pyeongchang.svg)

# Tokyo
## 2021
 The 2021 Tokyo Olympic medals are made up of recycled electronic devices.
![](images/tokyo.svg)`;

let uploadButtonState = {
    selected: 0,
    values: [
        {
            name: 'Content',
            key: 0,
        },
        {
            name: 'Pivot',
            key: 1,
        },
        {
            name: 'Background',
            key: 2,
        },
        {
            name: 'Visual Group Design',
            key: 3,
        },
        {
            name: 'Connection Design',
            key: 4,
        },
    ],
};

let colorButtonState = {
    selected: 0,
    values: [
        {
            name: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0'],
            key: 0,
            values: [
                '#7fc97f',
                '#beaed4',
                '#fdc086',
                '#ffff99',
                '#386cb0',
                '#f0027f',
                '#bf5b17',
                '#666666',
            ],
        },
        {
            name: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e'],
            key: 1,
            values: [
                '#1b9e77',
                '#d95f02',
                '#7570b3',
                '#e7298a',
                '#66a61e',
                '#e6ab02',
                '#a6761d',
                '#666666',
            ],
        },
        {
            name: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99'],
            key: 2,
            values: [
                '#a6cee3',
                '#1f78b4',
                '#b2df8a',
                '#33a02c',
                '#fb9a99',
                '#e31a1c',
                '#fdbf6f',
                '#ff7f00',
            ],
        },
        {
            name: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6'],
            key: 3,
            values: [
                '#fbb4ae',
                '#b3cde3',
                '#ccebc5',
                '#decbe4',
                '#fed9a6',
                '#ffffcc',
                '#e5d8bd',
                '#fddaec',
            ],
        },
        {
            name: ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9'],
            key: 4,
            values: [
                '#b3e2cd',
                '#fdcdac',
                '#cbd5e8',
                '#f4cae4',
                '#e6f5c9',
                '#fff2ae',
                '#f1e2cc',
                '#cccccc',
            ],
        },
        {
            name: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00'],
            key: 5,
            values: [
                '#e41a1c',
                '#377eb8',
                '#4daf4a',
                '#984ea3',
                '#ff7f00',
                '#ffff33',
                '#a65628',
                '#f781bf',
            ],
        },
        {
            name: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854'],
            key: 6,
            values: [
                '#66c2a5',
                '#fc8d62',
                '#8da0cb',
                '#e78ac3',
                '#a6d854',
                '#ffd92f',
                '#e5c494',
                '#b3b3b3',
            ],
        },
        {
            name: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3'],
            key: 7,
            values: [
                '#8dd3c7',
                '#ffffb3',
                '#bebada',
                '#fb8072',
                '#80b1d3',
                '#fdb462',
                '#b3de69',
                '#fccde5',
            ],
        },
        {
            name: ['#a6611a', '#dfc27d', '#f5f5f5', '#80cdc1', '#018571'],
            key: 8,
            values: [
                '#8c510a',
                '#bf812d',
                '#dfc27d',
                '#f6e8c3',
                '#c7eae5',
                '#80cdc1',
                '#35978f',
                '#01665e',
            ],
        },
        {
            name: ['#d01c8b', '#f1b6da', '#f7f7f7', '#b8e186', '#4dac26'],
            key: 9,
            values: [
                '#c51b7d',
                '#de77ae',
                '#f1b6da',
                '#fde0ef',
                '#e6f5d0',
                '#b8e186',
                '#7fbc41',
                '#4d9221',
            ],
        },
        {
            name: ['#7b3294', '#c2a5cf', '#f7f7f7', '#a6dba0', '#008837'],
            key: 10,
            values: [
                '#762a83',
                '#9970ab',
                '#c2a5cf',
                '#e7d4e8',
                '#d9f0d3',
                '#a6dba0',
                '#5aae61',
                '#1b7837',
            ],
        },
        {
            name: ['#e66101', '#fdb863', '#f7f7f7', '#b2abd2', '#5e3c99'],
            key: 11,
            values: [
                '#b35806',
                '#e08214',
                '#fdb863',
                '#fee0b6',
                '#d8daeb',
                '#b2abd2',
                '#8073ac',
                '#542788',
            ],
        },
        {
            name: ['#ca0020', '#f4a582', '#f7f7f7', '#92c5de', '#0571b0'],
            key: 12,
            values: [
                '#b2182b',
                '#d6604d',
                '#f4a582',
                '#fddbc7',
                '#d1e5f0',
                '#92c5de',
                '#4393c3',
                '#2166ac',
            ],
        },
        {
            name: ['#ca0020', '#f4a582', '#ffffff', '#bababa', '#404040'],
            key: 13,
            values: [
                '#b2182b',
                '#d6604d',
                '#f4a582',
                '#fddbc7',
                '#e0e0e0',
                '#bababa',
                '#878787',
                '#4d4d4d',
            ],
        },
        {
            name: ['#d7191c', '#fdae61', '#ffffbf', '#abd9e9', '#2c7bb6'],
            key: 14,
            values: [
                '#d73027',
                '#f46d43',
                '#fdae61',
                '#fee090',
                '#e0f3f8',
                '#abd9e9',
                '#74add1',
                '#4575b4',
            ],
        },
        {
            name: ['#d7191c', '#fdae61', '#ffffbf', '#a6d96a', '#1a9641'],
            key: 15,
            values: [
                '#d73027',
                '#f46d43',
                '#fdae61',
                '#fee08b',
                '#d9ef8b',
                '#a6d96a',
                '#66bd63',
                '#1a9850',
            ],
        },
        {
            name: ['#d7191c', '#fdae61', '#ffffbf', '#abdda4', '#2b83ba'],
            key: 16,
            values: [
                '#d53e4f',
                '#f46d43',
                '#fdae61',
                '#fee08b',
                '#e6f598',
                '#abdda4',
                '#66c2a5',
                '#3288bd',
            ],
        },
    ],
};

let connectionButtonState = {
    selected: 0,
    values: [
        {
            name: 'None',
            key: 0,
        },
        {
            name: 'Regular',
            key: 1,
        },
        {
            name: 'Pivot',
            key: 2,
        },
        {
            name: 'Alternate',
            key: 3,
        },
        {
            name: 'Flow Shape',
            key: 4,
        },
    ],
};

let exampleButtonState = {
    selected: 0,
    values: [
        {
            key: 0,
            name: '4 World Facts',
            value: fourWorldFacts,
        },
        {
            key: 1,
            name: '5 World Facts',
            value: fiveWorldFacts,
        },
        {
            key: 2,
            name: '4 Billionaires',
            value: fourBill,
        },
        {
            key: 3,
            name: '5 Billionaires',
            value: fiveBill,
        },
        {
            key: 4,
            name: '4 Olympics',
            value: fourOlympics,
        },
        {
            key: 5,
            name: '5 Olympics',
            value: fiveOlympics,
        },
    ],
};

let flowUrls = ['flows/flow0.jpg', 'flows/flow1.jpg'];

export {
    uploadButtonState,
    colorButtonState,
    connectionButtonState,
    exampleButtonState,
};
