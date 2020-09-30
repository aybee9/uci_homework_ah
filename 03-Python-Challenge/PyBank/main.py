import os
import csv

csvpath = os.path.join('budget_data.csv')
with open(csvpath) as csvfile:
    csvreader = csv.reader(csvfile, delimiter = ',')
    csv_header = next(csvreader)

    total_months = 0
    total_profit_losses = 0

    monthly_change = 0
    monthly_profit_losses = 0
    monthly_changes_list = []

    gr_increase = 0
    gr_increase_month = ''
    gr_decrease = 0

    for row in csvreader:
        
        # total months and total profit/losses
        total_months += 1
        total_profit_losses = total_profit_losses + int(row[1])
        
        monthly_change = int(row[1]) - monthly_profit_losses
        monthly_changes_list.append(monthly_change)
        monthly_profit_losses = int(row[1])

        # greatest increase 
        if monthly_change > gr_increase:
            gr_increase = monthly_change
            gr_increase_month = row[0]

        # greatest decrease
        if monthly_change < gr_decrease:
            gr_decrease = monthly_change
            gr_decrease_month = row[0]
    
    #average monthly change
    monthly_changes_list.pop(0)
    avg_sum = 0

    for num in monthly_changes_list:
        avg_sum = avg_sum + num

    average_change = avg_sum / (total_months - 1)


    print('Financial Analysis')
    print('----------------------------')
    print(f'Total months: {total_months}')
    print(f'Total: ${total_profit_losses}')
    print('Average Change: ${:1.2f}'.format(average_change))
    print(f'Greatest Increase in Profits: {gr_increase_month} ${gr_increase}')
    print(f'Greatest Increase in Profits: {gr_decrease_month} ${gr_decrease}')

# export to text file
csv_path = os.path.join('analysis_pybank','financial_ananlysis.txt')

with open(csv_path, 'w') as fa:

    fa.writelines(f'Total months: {total_months}')
    fa.writelines('\n')
    fa.writelines(f'Total: {total_profit_losses}')
    fa.writelines('\n')
    fa.writelines('Average Change: ${:1.2f}'.format(average_change))
    fa.writelines('\n')
    fa.writelines(f'Greatest Increase in Profits: {gr_increase_month} ${gr_increase}')
    fa.writelines('\n')
    fa.writelines(f'Greatest Increase in Profits: {gr_decrease_month} ${gr_decrease}')    



# with open('Analysis.txt', mode = 'w') as f:
#     f.write(f'Total months: {total_months}')
#     f.write('\n')
#     f.write(f'Total: {total_profit_losses}')
#     f.write('\n')
#     f.write('Average Change: ${:1.2f}'.format(average_change))
#     f.write('\n')
#     f.write(f'Greatest Increase in Profits: {gr_increase_month} ${gr_increase}')
#     f.write('\n')
#     f.write(f'Greatest Increase in Profits: {gr_decrease_month} ${gr_decrease}')
