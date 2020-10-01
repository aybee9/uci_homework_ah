# imports
import os 
import csv

# create path to where data is stored
csvpath = os.path.join('election_data.csv')

# open file
with open(csvpath) as csvfile:
    csvreader = csv.reader(csvfile, delimiter = ',')

    # create variables to count votes
    total_votes = 0
    khan_votes = 0
    correy_votes = 0
    li_votes = 0
    otooley_votes = 0

    # loop through csv file to find vote values for each candidate
    for row in csvreader:
        total_votes += 1

        if row[2] == 'Khan':
            khan_votes += 1
        elif row[2] == 'Correy':
            correy_votes += 1
        elif row[2] == 'Li':
            li_votes += 1
        else:
            row[2] == "O'Tooley"
            otooley_votes += 1

    # convert votes into percentage
    khan_percent = (khan_votes / total_votes) * 100
    correy_percent = (correy_votes / total_votes) * 100
    li_percent = (li_votes / total_votes) * 100
    otooley_percent = (otooley_votes / total_votes) * 100

    # create a list on each candidates votes and sort
    votes = []
    votes.append(khan_votes)
    votes.append(correy_votes)
    votes.append(li_votes)
    votes.append(otooley_votes)
    votes.sort()

    # find the max value to find the winner
    if khan_votes == votes[-1]:
        winner = 'Khan'
    elif correy_votes == winner[-1]:
        winner = 'Correy'
    elif li_votes == winner[-1]:
        winner = 'Li'
    else:
        winner = "O'Tooley"

    # print result on terminal
    print('Election Results')
    print('-------------------------')
    print(f'Total Votes: {total_votes}')
    print('-------------------------')
    print(f'Khan: {khan_percent:.3f}% ({khan_votes})')
    print(f'Correy: {correy_percent:.3f}% ({correy_votes})')
    print(f'Li: {li_percent:.3f}% ({li_votes})')
    print(f"O'Tooley: {otooley_percent:.3f}% ({otooley_votes})")
    print('-------------------------')
    print(f'Winner: {winner}')
    print('-------------------------')

# export to text file
# create path where file will be stored
csv_path = os.path.join('analysis_pypoll','voting_ananlysis.txt')
with open(csv_path, 'w') as v:

    v.writelines('Election Results')
    v.writelines('\n')
    v.writelines('-------------------------')
    v.writelines('\n')
    v.writelines(f'Total Votes: {total_votes}')
    v.writelines('\n')
    v.writelines('-------------------------')
    v.writelines('\n')
    v.writelines(f'Khan: {khan_percent:.3f}% ({khan_votes})')
    v.writelines('\n')
    v.writelines(f'Correy: {correy_percent:.3f}% ({correy_votes})')
    v.writelines('\n')
    v.writelines(f'Li: {li_percent:.3f}% ({li_votes})')
    v.writelines('\n')
    v.writelines(f"O'Tooley: {otooley_percent:.3f}% ({otooley_votes})")
    v.writelines('\n')
    v.writelines('-------------------------')
    v.writelines('\n')
    v.writelines(f'Winner: {winner}')
    v.writelines('\n')
    v.writelines('-------------------------')