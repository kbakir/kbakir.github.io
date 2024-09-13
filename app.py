from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/calculate', methods=['POST'])
def calculate_mortgage():
    data = request.get_json()
    loan_amount = float(data['loanAmount'])
    annual_interest_rate = float(data['interestRate']) / 100
    loan_term_years = int(data['loanTerm'])
    
    monthly_interest_rate = annual_interest_rate / 12
    number_of_payments = loan_term_years * 12

    monthly_payment = loan_amount * (monthly_interest_rate * (1 + monthly_interest_rate)**number_of_payments) / ((1 + monthly_interest_rate)**number_of_payments - 1)

    return jsonify({'monthlyPayment': round(monthly_payment, 2)})

if __name__ == '__main__':
    app.run(debug=True)
