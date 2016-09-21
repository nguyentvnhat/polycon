appGoogle.service('markerService',function(){
    var markerList = [];

    markerList = [
        {
            id: '01',
            name: 'Account01',
            address: 'Ho Ban Nguyet, Quan 7',
            latAttr: 10.726454,
            lngAttr: 106.7165579,
            checked: false
        },
        {
            id: '02',
            name: 'Account02',
            address: 'Cho Tan Dinh',
            latAttr: 10.7523674,
            lngAttr: 106.7000489,
            checked: false
        },
        {
            id: '03',
            name: 'Account03',
            address: 'Lotter Mart Quan 7',
            latAttr: 10.7863091,
            lngAttr: 106.6513805,
            checked: false
        },

        {
            id: '04',
            name: 'Account04',
            address: ' Cho Ben Thanh ',
            latAttr: 10.7725563,
            lngAttr: 106.6958022,
            checked: false
        },

        {
            id: '05',
            name: 'Account05',
            address: 'Nha tho Duc Ba',
            latAttr: 10.7797838,
            lngAttr: 106.6968061,
            checked: false
        },
    ];
    return markerList;
});