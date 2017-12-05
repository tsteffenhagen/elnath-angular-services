app.service('CarService', ['$http', function ($http) {
    var self = this;

    self.cars = { list: [] };


    self.getCars = function () {
        $http({
            method: 'GET',
            url: '/cars'
        }).then(function (response) {
            console.log('response', response);
            self.cars.list
            self.cars.list = response.data;
        })
    }
    self.addNewCar = function (newCar) {
        console.log(newCar);

        $http({
            method: 'POST',
            url: '/cars',
            data: newCar
        }).then(function (response) {
            console.log('response', response);
            self.newCar = {};
            self.getCars();

        })
    }

    self.deleteCar = function (carToDelete) {
                
        $http({
            method: 'DELETE',
            url: '/cars/' + carToDelete.id
        }).then(function (response) {
            console.log('response', response);
            self.getCars();
        });
    };
    
        self.editCar = function (CarToEdit) {
            $http({
                method: 'PUT',
                url: '/cars',
                data: CarToEdit
            }).then(function (response) {
                console.log('response', response);
                self.getCars();
                self.CarToEdit.showedit = !self.CarToEdit.showedit;
            });
        };


    self.getCars();
}]);