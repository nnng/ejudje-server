const express = require('express');
const cors = require('cors');

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());

app.get('/', (_request, response) => {
  response.type('text/plain').send(`Problem A — Simple Merge

\`\`\`python
t = int(input())

for _ in range(t):
    a = input().split()
    a.sort(key=len)
    print(*a)
\`\`\`

Problem B — Merge Two Sorted Arrays

\`\`\`python
n = int(input())
a = list(map(int, input().split()))
m = int(input())
b = list(map(int, input().split()))

print(*sorted(a + b))
\`\`\`

Problem C — Sorter

\`\`\`python
n, m = map(int, input().split())
a = [list(map(int, input().split())) for _ in range(n)]

a.sort(key=lambda x: (-sum(x), x))

for row in a:
    print(*row)
\`\`\`

Problem D — Count the Inversions

\`\`\`python
def merge_sort(a):
    if len(a) <= 1:
        return a, 0

    mid = len(a) // 2
    left, c1 = merge_sort(a[:mid])
    right, c2 = merge_sort(a[mid:])

    result = []
    i = j = 0
    count = c1 + c2

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            count += len(left) - i
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])

    return result, count


n = int(input())
a = list(map(int, input().split()))

print(merge_sort(a)[1])
\`\`\`

Problem E — Squares of a Sorted Array

\`\`\`python
n = int(input())
a = list(map(int, input().split()))

a.sort(key=abs)

print(*(x ** 2 for x in a))
\`\`\``);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});
