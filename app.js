document.getElementById('mortgageForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let loanAmount = document.getElementById('loanAmount').value;
    let interestRate = document.getElementById('interestRate').value;
    let loanTerm = document.getElementById('loanTerm').value;

    let data = {
        loanAmount: loanAmount,
        interestRate: interestRate,
        loanTerm: loanTerm
    };

    console.log('Submitting data:', data);  // Debugging: Check if the form data is captured correctly

    fetch('https://mortgagecalc-qsqq.onrender.com/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        console.log('Result from server:', result);  // Debugging: Ensure we receive a valid result
        document.getElementById('result').innerHTML = `Monthly Payment: $${result.monthlyPayment}`;  // Update UI with the result
    })
    .catch(error => {
        console.error('Error:', error);  // Error handling
        document.getElementById('result').innerHTML = 'Error calculating the mortgage payment. Please try again.';
    });
});
