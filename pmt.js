// JavaScript pV annuity PMT utility functions
// By Jonathan Duran
// ex: http://www.tvmcalcs.com/calculators/apps/lease_payments

// Performs PMT calculation and returns the monthly deposit required to meet a target
// Parameters (all required):
// expectedReturns - % annual return on account
// totalYears - length of savings plan
// totalSaved - amount already in account
// totalNeeded - target amount
var calculatePmt = function (expectedReturns, totalYears, totalSaved, totalNeeded) {
	var eR = expectedReturns;
	var yR = totalYears;
	var tS = totalSaved;
	var tN = totalNeeded;

	var returnAmt = 0;
	// PMT calculation
	var q = tS - ( tN / Math.pow(1+eR, yR) );
	if(q >= 0){
		// traget is overfunded
		returnAmt=0;
	}else{
		var d = ( 1 - ( 1 / Math.pow(1+eR, yR) ) ) / eR;
		var nC = Math.abs(q / d); // Annual contribution needed
		// monthly contribution needed
		returnAmt = nC / 12;
	}
	return returnAmt;
}

// Performs cashflow PMT and returns the total amount expected at the end of the savings plan
// Parameters (all required):
// expectedReturns - % annual return on account
// totalYears - length of savings plan
// totalSaved - amount already in account
// cashFlow - monthly deposit to account
var calculateCashFlowPmt = function (expectedReturns, totalYears, totalSaved, cashFlow) {
	var eR = expectedReturns;
	var tY = totalYears;
	var tS = totalSaved;
	var cF = cashFlow * 12;
	
	// Cash flow calculation
	var a = tS * Math.pow((1+eR), tY);
	var b = 0;
	for (var i = 0; i < tY; i++) {
		b += cF * Math.pow((1+eR), (tY-i));
	}

	// Return the total ROI
	var totalReturns = a + b;
	return totalReturns;
}
