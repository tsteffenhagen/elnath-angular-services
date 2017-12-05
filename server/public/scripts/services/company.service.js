app.service('CompanyService', ['$http', function($http) {
    var self = this;

    self.companies = {list: [] };

    self.newCompany = {}

    self.getCompanies = function() {
        $http({
            method: 'GET',
            url: '/companies'
        }).then(function (response) {
            console.log('response', response); 
                 
            self.companies.list = response.data;      
        })
    }

    self.addNewCompany = function (newCompany) {
        console.log(newCompany);
        
        $http({
            method: 'POST',
            url: '/companies',
            data: newCompany
        }).then(function (response) {
            console.log('response', response);
            self.newCompany = {};
            self.getCompanies();
            
        })
    }

    self.getCompanies();
}]);