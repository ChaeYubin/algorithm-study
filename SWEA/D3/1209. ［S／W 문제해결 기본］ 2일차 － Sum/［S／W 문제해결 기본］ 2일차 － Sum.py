T = 10

for test_case in range(1, T + 1):
    case_num = int(input())
    arr = [list(map(int, input().split())) for _ in range(100)]

    max_row_sum = 0
    max_col_sum = 0

    for i in range(100):
        max_row_sum = max(max_row_sum, sum(arr[i][num] for num in range(100)))
        max_col_sum = max(max_col_sum, sum(arr[num][i] for num in range(100)))

    max_diagonal_sum = max(sum(arr[i][i] for i in range(100)), sum(arr[i][99-i] for i in range(99, -1, -1)))

    print(f'#{test_case} {max(max_row_sum, max_col_sum, max_diagonal_sum)}')
    