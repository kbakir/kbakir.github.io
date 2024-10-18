from flask import Flask, request, jsonify
import math

app = Flask(__name__)

@app.route('/calculate', methods=['POST'])
def calculate_mortgage():
    data = request.json
    loan_amount = float(data['loanAmount'])
    annual_interest_rate = float(data['interestRate']) / 100
    loan_term_years = int(data['loanTerm'])

    monthly_interest_rate = annual_interest_rate / 12
    number_of_payments = loan_term_years * 12

    if monthly_interest_rate > 0:
        monthly_payment = loan_amount * (monthly_interest_rate * math.pow(1 + monthly_interest_rate, number_of_payments)) / (math.pow(1 + monthly_interest_rate, number_of_payments) - 1)
    else:
        monthly_payment = loan_amount / number_of_payments  # For 0% interest

    return jsonify({'monthlyPayment': round(monthly_payment, 2)})

if __name__ == '__main__':
    app.run(debug=True)
