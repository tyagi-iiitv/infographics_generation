// This file exports {flows1, flows2, flows3}
// indices to choose from flows are as follows:
// flows1 = [1,3,20,21,35] - 4 VGs
// flows2 = [0,1,2,3,4,7] - 5 VGs
// flows3 = [0,3,4,8,13] - 5 VGs

// Best VGs for each flow index
/*
flow1[1] 
flow1[3] 
flow1[21] 





*/
let flows1 = [
    [
        [163.22500000000002, 119.21875],
        [1115.7583333333334, 113.61874999999999],
        [1117.8916666666667, 802.4187499999999],
        [163.22500000000002, 802.4187499999999],
    ],
    [
        [1074.1583333333333, 195.21875],
        [217.625, 186.41875],
        [203.75833333333333, 803.21875],
        [1058.1583333333333, 800.81875],
    ],
    [
        [924.8000000000001, 164.79999999999998],
        [1138.1333333333332, 669.6],
        [538.6666666666666, 840],
        [155.73333333333335, 412.8],
    ],
    [
        [388.26666666666665, 124.80000000000001],
        [1070.9333333333334, 260],
        [888.5333333333334, 766.4],
        [210.13333333333333, 635.1999999999999],
    ],
    [
        [309.3333333333333, 218.8921828678421],
        [1112.5333333333333, 236.46746762365424],
        [1102.9333333333334, 731.7709471056328],
        [306.1333333333333, 643.0956467467623],
    ],
    [
        [250.66666666666666, 128.79999999999998],
        [1035.7333333333333, 359.2],
        [248.5333333333333, 590.4],
        [1033.6, 816.8],
    ],
    [
        [530.1333333333333, 147.2],
        [189.86666666666667, 599.1999999999999],
        [782.9333333333334, 818.4000000000001],
        [1114.6666666666667, 348.8],
    ],
    [
        [176.02499999999998, 226.95572690838353],
        [1063.4916666666666, 410.69829141959826],
        [179.225, 602.5047929313052],
        [1060.2916666666667, 789.7033304427309],
    ],
    [
        [661.3333333333334, 173.60000000000002],
        [171.73333333333332, 496.00000000000006],
        [635.7333333333333, 853.6],
        [1147.7333333333333, 522.4],
    ],
    [
        [240.00922139579484, 189.60691702340873],
        [1044.2759698767059, 406.4069390774474],
        [229.3425536440586, 592.8069580390379],
        [1035.742635675317, 796.8069787909932],
    ],
    [
        [279.46666666666664, 156.8],
        [1018.6666666666666, 373.6],
        [277.33333333333337, 587.2],
        [1021.8666666666667, 799.2],
    ],
    [
        [252.825, 175.21875],
        [1047.4916666666668, 358.41875],
        [252.825, 572.81875],
        [1051.7583333333332, 756.81875],
    ],
    [
        [211.20000000000002, 191.2],
        [1018.6666666666666, 385.6],
        [211.20000000000002, 588],
        [1020.8, 770.4],
    ],
    [
        [1001.625, 179.21875],
        [761.625, 817.61875],
        [508.825, 180.01875],
        [270.95833333333337, 817.61875],
    ],
    [
        [997.3333333333334, 151.2],
        [284.8, 372],
        [994.1333333333332, 592.8000000000001],
        [286.93333333333334, 812.8],
    ],
    [
        [932.2666666666668, 720.8000000000001],
        [967.4666666666667, 243.20000000000002],
        [344.5333333333333, 212],
        [286.93333333333334, 678.4],
    ],
    [
        [181.33333333333331, 248.79999999999998],
        [1083.7333333333333, 404.8],
        [176, 572.8],
        [1084.8, 741.5999999999999],
    ],
    [
        [996.2666666666667, 722.4],
        [972.8, 267.2],
        [337.0666666666666, 272],
        [324.2666666666667, 716.8000000000001],
    ],
    [
        [606.939394124349, 143.2045455932617],
        [641.0727274576823, 882.4045455932617],
        [210.13939412434897, 119.20454559326173],
        [966.4060607910155, 123.20454559326171],
    ],
    [
        [267.73333333333335, 160.8],
        [1015.4666666666667, 349.6],
        [259.20000000000005, 540],
        [1013.3333333333333, 732],
    ],
    [
        [1066.6666666666667, 288.51842420609233],
        [787.2, 793.425666566754],
        [499.20000000000005, 290.5220243741902],
        [215.46666666666667, 791.4220663986562],
    ],
    [
        [1121.0666666666666, 492.79999999999995],
        [608, 144],
        [650.6666666666666, 720],
        [153.6, 432],
    ],
    [
        [987.7583333333334, 238.41875],
        [286.9583333333333, 435.21875],
        [971.7583333333333, 633.61875],
        [283.7583333333333, 833.6187500000001],
    ],
    [
        [344.5333333333333, 134.59347195473472],
        [933.3333333333333, 365.32513816285143],
        [346.66666666666663, 598.4602592273027],
        [932.2666666666668, 829.1919254354193],
    ],
    [
        [329.6, 160],
        [934.4, 160.8],
        [934.4, 597.6],
        [334.93333333333334, 596],
    ],
    [
        [263.4666666666667, 198.4],
        [993.0666666666667, 384],
        [264.5333333333333, 556],
        [992, 740],
    ],
    [
        [188.825, 113.61874999999999],
        [768.025, 113.61874999999999],
        [768.025, 560.0187500000001],
        [195.22500000000002, 560.0187500000001],
    ],
    [
        [186.6727274576823, 112.80454559326172],
        [775.4727274576823, 126.40454559326173],
        [772.2727274576823, 556.0045455932617],
        [194.13939412434897, 560.8045455932618],
    ],
    [
        [1097.6000000000001, 265.1629674065187],
        [791.4666666666666, 689.0141971605678],
        [498.1333333333333, 265.1629674065187],
        [190.93333333333334, 692.0855828834233],
    ],
    [
        [921.5999999999999, 264.8],
        [360.53333333333336, 263.2],
        [357.33333333333337, 711.2],
        [920.5333333333333, 713.5999999999999],
    ],
    [
        [951.4916666666668, 171.21875],
        [339.225, 396.81874999999997],
        [950.4250000000001, 579.21875],
        [342.425, 801.61875],
    ],
    [
        [744.539394124349, 168.80454559326174],
        [232.53939412434897, 602.4045455932618],
        [1016.539394124349, 592.8045455932618],
        [253.8727274576823, 276.80454559326176],
    ],
    [
        [300.8060607910156, 208.00454559326172],
        [1025.0727274576823, 372.0045455932617],
        [284.8060607910156, 536.0045455932617],
        [1018.6727274576823, 686.4045455932618],
    ],
    [
        [348.825, 593.6187500000001],
        [349.8916666666667, 180.01875],
        [915.2249999999999, 180.01875],
        [917.3583333333333, 590.4187499999999],
    ],
    [
        [1011.2, 559.2],
        [770.1333333333333, 186.39999999999998],
        [272, 367.2],
        [502.40000000000003, 743.2],
    ],
    [
        [245.33333333333334, 297.6],
        [1009.0666666666666, 440.8],
        [246.4, 600],
        [1010.1333333333333, 739.2],
    ],
    [
        [249.60000000000002, 300],
        [1010.1333333333333, 441.6],
        [245.33333333333334, 600],
        [1010.1333333333333, 740.8],
    ],
    [
        [776.5583333333334, 156.01874999999998],
        [212.29166666666669, 155.21875],
        [213.35833333333335, 562.4187499999999],
        [775.4916666666667, 560.0187500000001],
    ],
    [
        [295.4666666666667, 213.6],
        [1009.0666666666666, 368],
        [286.93333333333334, 528],
        [1009.0666666666666, 686.4],
    ],
    [
        [411.73333333333335, 224],
        [941.8666666666667, 300.8],
        [878.9333333333333, 708.8],
        [355.20000000000005, 667.1999999999999],
    ],
    [
        [202.69166666666666, 517.61875],
        [403.22499999999997, 187.21875],
        [881.0916666666667, 182.41875000000002],
        [1095.4916666666666, 516.01875],
    ],
    [
        [268.825, 264.41364950838636],
        [577.0916666666667, 780.3817235396183],
        [699.7583333333332, 265.8350491613649],
        [1031.4916666666668, 774.6961249277039],
    ],
    [
        [377.59999999999997, 659.872054922765],
        [378.6666666666667, 247.65173974098923],
        [932.2666666666668, 250.04836948041816],
        [923.7333333333333, 660.6709315025745],
    ],
    [
        [942.9333333333334, 226.4],
        [333.8666666666666, 412],
        [941.8666666666667, 594.4],
        [338.1333333333333, 787.1999999999999],
    ],
    [
        [957.8666666666666, 206.4],
        [321.0666666666667, 248.00000000000003],
        [956.8000000000001, 552],
        [318.93333333333334, 608.8],
    ],
    [
        [942.9583333333334, 181.61875],
        [737.0916666666666, 733.61875],
        [538.6916666666666, 180.81875],
        [331.7583333333334, 733.61875],
    ],
    [
        [376.55833333333334, 276.81874999999997],
        [374.425, 682.4187499999999],
        [918.425, 681.61875],
        [920.5583333333334, 272.01874999999995],
    ],
    [
        [244.26666666666665, 181.60000000000002],
        [256, 584.8],
        [797.8666666666666, 585.6],
        [802.1333333333334, 184],
    ],
    [
        [273.06666666666666, 624.8000000000001],
        [1102.9333333333334, 413.6],
        [214.4, 367.2],
        [1037.8666666666666, 683.2],
    ],
    [
        [215.49166666666667, 336.36711281070745],
        [1065.625, 460.6444600986213],
        [221.89166666666665, 593.5779410284794],
        [1060.2916666666667, 709.8174499345879],
    ],
];

let flows2 = [
    [
        [196.26666666666665, 154.4],
        [1043.1999999999998, 309.6],
        [197.33333333333334, 464.8],
        [1044.2666666666667, 619.2],
        [201.6, 775.2],
    ],
    [
        [601.5999999999999, 150.4],
        [1019.7333333333333, 366.4],
        [276.26666666666665, 556],
        [1020.8, 721.6],
        [267.73333333333335, 829.6],
    ],
    [
        [641.0916666666667, 544.01875],
        [958.9583333333333, 298.41875],
        [308.29166666666663, 284.81875],
        [320.025, 774.4187499999999],
        [963.225, 768.0187500000001],
    ],
    [
        [301.8666666666667, 202.4],
        [981.3333333333334, 345.59999999999997],
        [311.4666666666667, 488.8],
        [978.1333333333333, 640],
        [306.1333333333333, 786.4000000000001],
    ],
    [
        [315.73333333333335, 433.6],
        [346.66666666666663, 141.6],
        [958.9333333333333, 292.8],
        [944, 596.8000000000001],
        [324.2666666666667, 736],
    ],
    [
        [316.8, 435.2],
        [346.66666666666663, 141.6],
        [962.1333333333334, 292.8],
        [939.7333333333333, 596],
        [324.2666666666667, 736.8],
    ],
    [
        [317.8666666666667, 268],
        [955.7333333333333, 704.8],
        [954.6666666666667, 413.6],
        [321.0666666666667, 848.8],
        [320, 557.6],
    ],
    [
        [998.4000000000001, 533.5999999999999],
        [278.4, 658.4],
        [276.26666666666665, 405.59999999999997],
        [993.0666666666667, 276],
        [1000.5333333333333, 784],
    ],
    [
        [266.69166666666666, 477.61875],
        [600.5583333333333, 191.21875],
        [1027.225, 438.41875],
        [893.8916666666667, 705.61875],
        [400.025, 684.01875],
    ],
    [
        [226.13333333333333, 265.6],
        [439.46666666666664, 641.6],
        [647.4666666666667, 268.8],
        [858.6666666666666, 641.6],
        [1056, 270.40000000000003],
    ],
    [
        [968.5333333333334, 140],
        [700.8, 139.2],
        [167.46666666666667, 325.6],
        [167.46666666666667, 512.8],
        [168.5333333333333, 723.1999999999999],
    ],
    [
        [1080.5583333333334, 532.01875],
        [941.8916666666667, 398.41875000000005],
        [359.4916666666666, 347.21875],
        [222.95833333333334, 480.81875],
        [243.22500000000002, 796.81875],
    ],
    [
        [933.3333333333333, 189.60000000000002],
        [343.46666666666664, 318.4],
        [932.2666666666668, 442.4],
        [348.8, 564.8000000000001],
        [946.1333333333333, 692],
    ],
    [
        [301.8727274576823, 154.28419247162162],
        [201.60606079101564, 351.64045572021894],
        [497.0727274576823, 517.9406572393416],
        [794.6727274576823, 282.51567316106554],
        [976.0060607910157, 525.9551247824318],
    ],
    [
        [266.6666666666667, 244],
        [427.73333333333335, 557.6],
        [624, 252.79999999999998],
        [819.2, 518.4000000000001],
        [931.2, 192.8],
    ],
    [
        [444.79999999999995, 171.20000000000002],
        [837.3333333333334, 317.59999999999997],
        [446.93333333333334, 460],
        [834.1333333333332, 597.6],
        [443.73333333333335, 740.8],
    ],
    [
        [197.35833333333332, 154.41875000000002],
        [409.625, 371.21875],
        [638.9583333333334, 204.81875],
        [850.1583333333333, 450.41875],
        [1080.5583333333334, 308.01875],
    ],
    [
        [998.4092985442402, 156.80691368681983],
        [850.1426167951067, 312.8069295559621],
        [994.1426314435456, 458.4069443671615],
        [846.9426164695858, 616.8069604804443],
        [996.275964993893, 772.8069763495866],
    ],
    [
        [312.53333333333336, 340.79999999999995],
        [297.6, 606.4000000000001],
        [723.1999999999999, 608],
        [765.8666666666668, 336],
        [1144.5333333333333, 336.8],
    ],
    [
        [237.86666666666665, 492.7121229902594],
        [440.53333333333336, 273.9960098579979],
        [644.2666666666667, 490.3086492195751],
        [859.7333333333333, 278.8029573993663],
        [1053.8666666666668, 509.5364393850487],
    ],
    [
        [844.825, 231.21875],
        [1110.425, 472.81874999999997],
        [494.9583333333333, 399.21875],
        [742.4250000000001, 582.41875],
        [183.49166666666665, 584.0187500000001],
    ],
    [
        [433.0916666666667, 430.41875],
        [722.1583333333333, 280.01875],
        [964.2916666666666, 455.21875],
        [848.025, 696.81875],
        [491.7583333333334, 630.41875],
    ],
    [
        [1150.9333333333334, 432.79999999999995],
        [832, 537.6],
        [775.4666666666667, 356.79999999999995],
        [236.8, 555.2],
        [165.33333333333334, 378.4],
    ],
    [
        [459.73333333333335, 260.1101189099153],
        [852.2666666666668, 358.1844260398834],
        [455.4666666666667, 464.78693378984866],
        [854.4, 584.1817424698098],
        [459.73333333333335, 663.7782815897839],
    ],
    [
        [201.6, 135.20000000000002],
        [208, 310.4],
        [203.73333333333335, 480],
        [205.86666666666667, 652.8000000000001],
        [204.8, 823.2],
    ],
    [
        [180.26666666666668, 472.8],
        [414.93333333333334, 442.4],
        [645.3333333333333, 470.4],
        [869.3333333333334, 442.4],
        [1099.7333333333333, 468.8],
    ],
    [
        [1067.7426389305256, 316.00692988148296],
        [856.5426174461484, 396.8069381008848],
        [642.1425956362503, 468.80694542510435],
        [425.60924027600504, 545.6069532376051],
        [209.0758849157598, 624.8069612942465],
    ],
    [
        [644.2916666666666, 812.5111899229546],
        [840.5583333333334, 284.54445395621866],
        [439.4916666666666, 278.5334474746239],
        [241.09166666666667, 815.516693163752],
        [1035.7583333333334, 812.5111899229546],
    ],
    [
        [200.53333333333336, 717.7902188497663],
        [411.73333333333335, 719.211585619766],
        [629.3333333333333, 717.7902188497663],
        [849.0666666666666, 717.7902188497663],
        [1077.3333333333333, 719.211585619766],
    ],
    [
        [664.5333333333333, 177.6],
        [738.1333333333333, 321.6],
        [806.4, 468],
        [725.3333333333333, 609.6],
        [668.8, 754.4000000000001],
    ],
    [
        [630.4, 207.2],
        [634.6666666666667, 326.40000000000003],
        [624, 436.8],
        [637.8666666666667, 552],
        [669.8666666666667, 666.4000000000001],
    ],
    [
        [183.46666666666667, 668.8],
        [405.3333333333333, 665.6],
        [625.0666666666667, 668],
        [835.1999999999999, 668],
        [1065.6, 668.8],
    ],
    [
        [198.425, 688.2837226366638],
        [420.2916666666667, 360.68386938975175],
        [631.4916666666667, 687.2818882230647],
        [853.3583333333332, 359.68203497615264],
        [1074.1583333333333, 687.2818882230647],
    ],
    [
        [499.20000000000005, 139.2],
        [685.8666666666668, 305.6],
        [469.3333333333333, 467.20000000000005],
        [692.2666666666668, 615.2],
        [449.06666666666666, 782.4],
    ],
    [
        [197.35833333333332, 560.0187500000001],
        [413.89166666666665, 400.81875],
        [637.8916666666667, 565.6187500000001],
        [861.8916666666667, 403.21875],
        [1079.4916666666668, 556.81875],
    ],
    [
        [211.20000000000002, 661.6],
        [422.40000000000003, 289.6],
        [631.4666666666667, 662.4],
        [843.7333333333333, 291.2],
        [1054.9333333333334, 664],
    ],
    [
        [926.9333333333333, 225.6],
        [1073.0666666666666, 515.1999999999999],
        [894.9333333333334, 699.2],
        [529.0666666666666, 664.8],
        [452.26666666666665, 414.4],
    ],
    [
        [979.2, 270.4842654492092],
        [882.1333333333334, 750.3433882276211],
        [641.0666666666667, 849.5209522256644],
        [396.8, 750.3433882276211],
        [304, 272.48785260068485],
    ],
    [
        [160, 127.2],
        [1058.1333333333332, 222.4],
        [1060.2666666666667, 338.4],
        [640, 473.6],
        [637.8666666666667, 612],
    ],
    [
        [171.73333333333332, 691.0617876424715],
        [402.1333333333333, 694.1331733653269],
        [632.5333333333333, 694.1331733653269],
        [873.6, 693.1093781243751],
        [1112.5333333333333, 692.0855828834233],
    ],
    [
        [157.86666666666667, 472],
        [402.1333333333333, 595.2],
        [638.9333333333333, 660],
        [884.2666666666667, 593.5999999999999],
        [1121.0666666666666, 468],
    ],
    [
        [684.8000000000001, 260],
        [677.3333333333334, 354.4],
        [665.6, 460.79999999999995],
        [666.6666666666667, 564.8000000000001],
        [669.8666666666667, 662.4],
    ],
    [
        [225.06666666666666, 800.2294915097395],
        [417.0666666666666, 801.650858279739],
        [638.9333333333333, 798.8081247397399],
        [856.5333333333333, 797.3867579697404],
        [1054.9333333333334, 798.8081247397399],
    ],
    [
        [539.7333333333333, 297.0656549299033],
        [705.0666666666666, 295.64428815990374],
        [496, 501.7424698098367],
        [748.8, 500.32110303983717],
        [619.7333333333333, 632.5082126497941],
    ],
    [
        [171.73333333333332, 727.9184163167366],
        [406.4, 726.8946210757848],
        [642.1333333333334, 723.8232353529295],
        [872.5333333333333, 727.9184163167366],
        [1107.2, 727.9184163167366],
    ],
    [
        [1012.2666666666668, 255.45736181314203],
        [914.1333333333332, 765.3702918636882],
        [652.8, 865.5496494374694],
        [394.6666666666667, 763.3667047122126],
        [292.26666666666665, 258.46274254035546],
    ],
];

let flows3 = [
    [
        [1012.2666931152344, 255.4573631286621],
        [914.13330078125, 765.3702735900879],
        [652.7999877929688, 865.5496215820312],
        [394.6666717529297, 763.36669921875],
        [292.26667404174805, 258.46275329589844],
    ],
    [
        [998.3999633789062, 533.6000061035156],
        [278.4000015258789, 658.4000015258789],
        [276.2666702270508, 405.60001373291016],
        [993.0666351318359, 275.9999942779541],
        [1000.5333709716797, 783.9999961853027],
    ],
    [
        [979.1999816894531, 270.48425674438477],
        [882.1333312988281, 750.3433799743652],
        [641.0666656494141, 849.5209693908691],
        [396.8000030517578, 750.3433799743652],
        [303.99999618530273, 272.48785972595215],
    ],
    [
        [171.73334121704102, 691.0617828369141],
        [402.1333312988281, 694.1331481933594],
        [632.5333404541016, 694.1331481933594],
        [873.6000061035156, 693.1093597412109],
        [1112.5333404541016, 692.0855712890625],
    ],
    [
        [157.86666870117188, 472.00000762939453],
        [402.1333312988281, 595.2000045776367],
        [638.9333343505859, 660],
        [884.2666625976562, 593.6000061035156],
        [1121.066665649414, 468.0000114440918],
    ],
    [
        [200.53333282470703, 717.7902030944824],
        [411.7333221435547, 719.2115592956543],
        [629.3333435058594, 717.7902030944824],
        [849.0666961669922, 717.7902030944824],
        [1077.3332977294922, 719.2115592956543],
    ],
    [
        [198.42500686645508, 688.2837295532227],
        [420.2916717529297, 360.68387031555176],
        [631.4916610717773, 687.2819137573242],
        [853.3583068847656, 359.6820259094238],
        [1074.1583251953125, 687.2819137573242],
    ],
    [
        [926.9333648681641, 225.5999994277954],
        [1073.066635131836, 515.200023651123],
        [894.9333190917969, 699.2000198364258],
        [529.0666580200195, 664.7999954223633],
        [452.2666549682617, 414.4000053405762],
    ],
    [
        [933.3333587646484, 189.6000051498413],
        [343.46668243408203, 318.40001106262207],
        [932.2666931152344, 442.4000072479248],
        [348.80001068115234, 564.799976348877],
        [946.1333465576172, 692.0000267028809],
    ],
    [
        [183.4666633605957, 668.799991607666],
        [405.3333282470703, 665.5999946594238],
        [625.0666809082031, 667.9999923706055],
        [835.1999664306641, 667.9999923706055],
        [1065.5999755859375, 668.799991607666],
    ],
    [
        [312.53334045410156, 340.7999897003174],
        [297.60000228881836, 606.3999938964844],
        [723.1999969482422, 607.9999923706055],
        [765.86669921875, 335.9999942779541],
        [1144.5333099365234, 336.79999351501465],
    ],
    [
        [301.87273025512695, 154.28419589996338],
        [201.60606384277344, 351.6404628753662],
        [497.07271575927734, 517.9406547546387],
        [794.6726989746094, 282.5156593322754],
        [976.0060882568359, 525.9551239013672],
    ],
    [
        [433.09165954589844, 430.418758392334],
        [722.1583557128906, 280.0187587738037],
        [964.2916870117188, 455.21876335144043],
        [848.0249786376953, 696.818733215332],
        [491.7583465576172, 630.4187393188477],
    ],
    [
        [197.35834121704102, 560.0187492370605],
        [413.8916778564453, 400.81875801086426],
        [637.8916549682617, 565.6187438964844],
        [861.8916320800781, 403.2187557220459],
        [1079.4916534423828, 556.8187522888184],
    ],
    [
        [998.4092712402344, 156.80691719055176],
        [850.1425933837891, 312.80694007873535],
        [994.1426086425781, 458.40694427490234],
        [846.9425964355469, 616.8069648742676],
        [996.2759399414062, 772.8069877624512],
    ],
    [
        [459.73331451416016, 260.1101303100586],
        [852.2666931152344, 358.1844234466553],
        [455.4666519165039, 464.7869396209717],
        [854.4000244140625, 584.1817474365234],
        [459.73331451416016, 663.7782669067383],
    ],
    [
        [266.6666603088379, 243.99999618530273],
        [427.7333450317383, 557.599983215332],
        [624.0000152587891, 252.79998779296875],
        [819.1999816894531, 518.4000205993652],
        [931.2000274658203, 192.8000020980835],
    ],
    [
        [237.86666870117188, 492.71209716796875],
        [440.53333282470703, 273.9960193634033],
        [644.2666625976562, 490.30866622924805],
        [859.7333526611328, 278.8029670715332],
        [1053.8666534423828, 509.5364570617676],
    ],
    [
        [180.26666641235352, 472.8000068664551],
        [414.9333190917969, 442.4000072479248],
        [645.3333282470703, 470.40000915527344],
        [869.3333435058594, 442.4000072479248],
        [1099.7333526611328, 468.80001068115234],
    ],
    [
        [499.1999816894531, 139.19999599456787],
        [685.86669921875, 305.5999946594238],
        [469.3333435058594, 467.20001220703125],
        [692.2666931152344, 615.1999855041504],
        [449.06665802001953, 782.3999977111816],
    ],
    [
        [664.5333099365234, 177.60000228881836],
        [738.1333160400391, 321.60000801086426],
        [806.3999938964844, 468.0000114440918],
        [725.3333282470703, 609.5999908447266],
        [668.7999725341797, 754.4000244140625],
    ],
    [
        [539.7333145141602, 297.0656490325928],
        [705.0666809082031, 295.6442928314209],
        [495.99998474121094, 501.74245834350586],
        [748.7999725341797, 500.321102142334],
        [619.7333145141602, 632.5082015991211],
    ],
    [
        [630.4000091552734, 207.2000026702881],
        [634.6666717529297, 326.40000343322754],
        [624.0000152587891, 436.800012588501],
        [637.8666687011719, 551.9999885559082],
        [669.8666381835938, 666.3999938964844],
    ],
    [
        [684.8000335693359, 260.00000953674316],
        [677.3332977294922, 354.4000053405762],
        [665.5999755859375, 460.7999897003174],
        [666.6666412353516, 564.799976348877],
        [669.8666381835938, 662.3999977111816],
    ],
    [
        [226.13332748413086, 265.600004196167],
        [439.46666717529297, 641.6000175476074],
        [647.4666595458984, 268.8000011444092],
        [858.6666870117188, 641.6000175476074],
        [1055.999984741211, 270.3999996185303],
    ],
];

export { flows1, flows2, flows3 };
