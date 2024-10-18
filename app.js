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

    fetch('https://mortgagecalc-qsqq.onrender.com/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('result').innerHTML = `Monthly Payment: $${result.monthlyPayment}`;
    })
    .catch(error => console.error('Error:', error));
});
