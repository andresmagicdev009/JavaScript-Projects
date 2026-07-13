function Vehicle(vehicleBrand,   vehicleBasePrice) {
    this.vehicleBrand = vehicleBrand;
    this.vehicleBasePrice = vehicleBasePrice;
}


Vehicle.prototype.getVehicleDetails = function() {
    return {
        brand: this.vehicleBrand,
            
        basePrice: this.vehicleBasePrice
    };
}

Vehicle.prototype.calculateTotalPrice = function(taxRate){
    const taxAmount = this.vehicleBasePrice * taxRate;
    const totalPrice = this.vehicleBasePrice + taxAmount;
    return totalPrice;
}




Vehicle.prototype.rentalCost = function(days) {
    const totalRentalCost = this.vehicleBasePrice * days;
    return totalRentalCost;
}

const vehicle1 = new Vehicle('Toyota', 2.50);
console.log(vehicle1.getVehicleDetails());
console.log("Su costo de rental total es de:" +  vehicle1.rentalCost(3))
console.log('Total Price with Tax:', vehicle1.calculateTotalPrice(0.08)); // Assuming 8% tax rate