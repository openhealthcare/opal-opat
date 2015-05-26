
describe('OPATDischargeCtrl', function (){
    var $controller, $scope, $httpBackend, $modalInstance, $modal;
    var Episode, Item;
    var controller;
    var episode, options, tags;


    beforeEach(module('opal.controllers'));
    
    beforeEach(inject(function($injector){
        $rootScope   = $injector.get('$rootScope');
        $scope       = $rootScope.$new();
        $modal       = $injector.get('$modal');
        $controller  = $injector.get('$controller');
        $httpBackend = $injector.get('$httpBackend');
        Episode      = $injector.get('Episode');
        Item         = $injector.get('Item');

        columns = {
            "default": [
                {
                    name: 'demographics',
                    single: true,
                    fields: [
                        {name: 'name', type: 'string'},
                        {name: 'date_of_birth', type: 'date'},
                    ]},
                {
                    name: 'location',
                    single: true,
                    fields: [
                        {name: 'category', type: 'string'},
                        {name: 'hospital', type: 'string'},
                        {name: 'ward', type: 'string'},
                        {name: 'bed', type: 'string'},
                        {name: 'date_of_admission', type: 'date'},
                        {name: 'tags', type: 'list'},
                    ]},
                {
                    name: 'diagnosis',
                    single: false,
                    fields: [
                        {name: 'condition', type: 'string'},
                        {name: 'provisional', type: 'boolean'},
                    ]},
            ]
        };
        fields = {}
        _.each(columns.default, function(c){fields[c.name] = c});
        $rootScope.fields = fields;

        $modalInstance = $modal.open({template: 'Not a real template'});
        episode_history = [1,2,3,4]
        episode = new Episode({id: 33, episode_history: episode_history});
        options = {};
        tags    = {};

        controller = $controller('OPATDischargeCtrl', {
            $scope        : $scope,
            $modalInstance: $modalInstance,
            episode       : episode,
            options       : options,
            tags          : tags
        });

    }));

    it('Should set up state', function () {
        expect($scope.episode).toBe(episode);
    });
    
});
