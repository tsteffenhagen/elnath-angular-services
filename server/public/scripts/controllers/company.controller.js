app.controller('CompanyController', ['CompanyService', function(CompanyService){
    var self = this;
    self.message = 'What up homie??';     
    self.companies = CompanyService.companies
    self.addNewCompany = CompanyService.addNewCompany
}]);