Sub StockMarketAnalysis()
    
    'loop through all active worksheets
    Dim x As Integer
    x = Application.Worksheets.Count
    
    For w = 1 To x
    Worksheets(w).Activate

        'count all columns with values in them 
        TotalRows = Cells(Rows.Count, 1).End(xlUp).Row

        ' Ticker / Yearly Change / Percent Change
        '---------------------------------------------------------------------------------
        'headers
        Cells(1, 9).Value = "Ticker"
        Cells(1, 10).Value = "Yearly Change"
        Cells(1, 11).Value = "Percent Change"
        
        'variables
        Dim ticker As Long
        
        Dim first As Double
        Dim last As Double
        Dim year_change As Double
        Dim fl_count As Long
        Dim percent_change As Double
        Dim conditional_formatting As Long

        ticker = 0
        fl_count = 0
        conditional_formatting = 0
    
        For i = 2 To TotalRows + 1

    
            'find all unique ticker(s)
            If Cells(i, 1).Value <> Cells(i + 1, 1).Value Then
            Cells(2 + ticker, 9).Value = Cells(i, 1).Value
            ticker = ticker + 1
            End If
        
            'find open(first) and close(last) prices
            If Cells(i - 1, 1).Value <> Cells(i, 1).Value Then
            first = Cells(i, 3).Value
        
            ElseIf Cells(i, 1).Value <> Cells(i + 1, 1).Value Then
            last = Cells(i, 6).Value
        
            yearly_change = first - last
            Cells(2 + fl_count, 10).Value = yearly_change * -1
        
                'Yearly change as percentage
                If first = 0 Then
                Cells(2 + fl_count, 11).Value = 0
                Else: percent_change = (yearly_change / first) * -1
                Cells(2 + fl_count, 11).Value = format(percent_change,"Percent")
                End If
            
                'conditional formatting based on positive/negative change
                If Cells(2 + conditional_formatting, 10).Value <= 0 Then
                Cells(2 + conditional_formatting, 10).Interior.ColorIndex = 3
                conditional_formatting = conditional_formatting + 1
                Else:
                Cells(2 + conditional_formatting, 10).Interior.ColorIndex = 4
                conditional_formatting = conditional_formatting + 1
                End If
        
            fl_count = fl_count + 1
            End If
    
        Next i

        'Total Stock Volume
        '---------------------------------------------------------------------------------
        'headers
        Cells(1, 12).Value = "Total Stock Volume"
    
        'variables
        Dim ts_count as Long
        Dim stock_volume As Double
        
        ts_count = 0
        stock_volume = 0
        

        For i = 2 To TotalRows + 1
        
        
            'find total stock volume
            If Cells(i, 1).Value = Cells(2 + ts_count, 9).Value Then
            stock_volume = stock_volume + Cells(i, 7).Value
        
            Else:
            Cells(2 + ts_count, 12).Value = stock_volume
            stock_volume = Cells(i, 7).Value
            ts_count = ts_count + 1
            End If

        Next i
    
        '***BONUS***Greatest Increase / Greatestest Decrease / Greatest Volume
        '---------------------------------------------------------------------------------
        'headers
        Cells(2, 15).Value = "Greatest % Increase"
        Cells(3, 15).Value = "Greatest % Decrease"
        Cells(4, 15).Value = "Greatest Total Volume"
        Cells(1, 16).Value = "Ticker"
        Cells(1, 17).Value = "Value"
    
        'variables
        Dim gr_increase As Double
        Dim gr_decrease As Double
        Dim gr_totalvolume As Double
        Dim gr_count As Long
    
        gr_increase = 0
        gr_decrease = 0
        gr_totalvolume = Cells(2, 12).Value
        gr_count = 0
    
        For i = 2 To TotalRows + 1
    
                
                'finding greatest increase
                If Cells(2 + gr_count, 11).Value > gr_increase Then
                gr_increase = Cells(2 + gr_count, 11).Value
                Cells(2, 16).Value = Cells(2 + gr_count, 9).Value
                Cells(2, 17).Value = format(gr_increase,"Percent")
                End If
            
                'finding greatest decrease
                If Cells(2 + gr_count, 11).Value < gr_decrease Then
                gr_decrease = Cells(2 + gr_count, 11)
                Cells(3, 16).Value = Cells(2 + gr_count, 9).Value
                Cells(3, 17).Value = format(gr_decrease,"Percent")
                End If
        
                'finding greatest total stock volume
                If Cells(2 + gr_count, 12).Value > gr_totalvolume Then
                gr_totalvolume = Cells(2 + gr_count, 12).Value
                Cells(4, 16).Value = Cells(2 + gr_count, 9).Value
                Cells(4, 17).Value = gr_totalvolume
                End If
            
                gr_count = gr_count + 1
    
        Next i
    Next w
End Sub