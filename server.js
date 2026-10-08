const express = require('express');
const cors = require('cors');

const app = express();
const port = Number(process.env.PORT) || 3000;

// Разрешаем запросы из любого источника.
app.use(cors());

app.get('/', (_request, response) => {
  response.type('text/plain').send(`Problem A — Mountains

\`\`\`python
import sys

input = sys.stdin.readline

n, m = map(int, input().split())
a = list(map(int, input().split()))

order = sorted(range(n), key=lambda i: (a[i], -i))

left = [-1] * n
right = [-1] * n
stack = []

for i in order:
    last = -1

    while stack and stack[-1] > i:
        last = stack.pop()

    if stack:
        right[stack[-1]] = i

    if last != -1:
        left[i] = last

    stack.append(i)

for _ in range(m):
    path = input().strip()
    node = 0

    for direction in path:
        if direction == 'L':
            node = left[node]
        else:
            node = right[node]

        if node == -1:
            break

    print("YES" if node != -1 else "NO")
\`\`\`

Problem B — Get subtree

\`\`\`python
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


n = int(input())
a = list(map(int, input().split()))
x = int(input())

root = Node(a[0])

for value in a[1:]:
    current = root

    while True:
        if value < current.value:
            if current.left is None:
                current.left = Node(value)
                break
            current = current.left
        else:
            if current.right is None:
                current.right = Node(value)
                break
            current = current.right

current = root

while current.value != x:
    if x < current.value:
        current = current.left
    else:
        current = current.right

count = 0
stack = [current]

while stack:
    node = stack.pop()
    count += 1

    if node.left is not None:
        stack.append(node.left)

    if node.right is not None:
        stack.append(node.right)

print(count)
\`\`\`

Problem C — Christmas Gifts

\`\`\`python
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


n = int(input())
a = list(map(int, input().split()))
k = int(input())

root = Node(a[0])

for value in a[1:]:
    current = root

    while True:
        if value < current.value:
            if current.left is None:
                current.left = Node(value)
                break
            current = current.left
        else:
            if current.right is None:
                current.right = Node(value)
                break
            current = current.right

current = root

while current.value != k:
    if k < current.value:
        current = current.left
    else:
        current = current.right

result = []
stack = [current]

while stack:
    node = stack.pop()
    result.append(node.value)

    if node.right is not None:
        stack.append(node.right)

    if node.left is not None:
        stack.append(node.left)

print(*result)
\`\`\`

Problem D — Aureole

\`\`\`python
n = int(input())
p = list(map(int, input().split()))

pos = [0] * (n + 1)

for i, value in enumerate(p):
    pos[value] = i

left = [0] * (n + 1)
right = [0] * (n + 1)
stack = []

for value in range(1, n + 1):
    last = 0

    while stack and pos[stack[-1]] > pos[value]:
        last = stack.pop()

    if stack:
        right[stack[-1]] = value

    if last:
        left[value] = last

    stack.append(value)

root = stack[0]

sums = []
stack = [(root, 0)]

while stack:
    node, level = stack.pop()

    if level == len(sums):
        sums.append(0)

    sums[level] += node

    if right[node]:
        stack.append((right[node], level + 1))

    if left[node]:
        stack.append((left[node], level + 1))

print(len(sums))
print(*sums)
\`\`\`

Problem E — Width

\`\`\`python
from collections import deque

n = int(input())

left = [0] * (n + 1)
right = [0] * (n + 1)

for _ in range(n - 1):
    x, y, z = map(int, input().split())

    if z == 0:
        left[x] = y
    else:
        right[x] = y

queue = deque([1])
answer = 0

while queue:
    size = len(queue)
    answer = max(answer, size)

    for _ in range(size):
        node = queue.popleft()

        if left[node]:
            queue.append(left[node])

        if right[node]:
            queue.append(right[node])

print(answer)
\`\`\`

Problem F — Triangle Binary Search Tree

\`\`\`python
n = int(input())
a = list(map(int, input().split()))

pos = [0] * (n + 1)

for i, value in enumerate(a):
    pos[value] = i

left = [0] * (n + 1)
right = [0] * (n + 1)
stack = []

for value in range(1, n + 1):
    last = 0

    while stack and pos[stack[-1]] > pos[value]:
        last = stack.pop()

    if stack:
        right[stack[-1]] = value

    if last:
        left[value] = last

    stack.append(value)

answer = 0

for value in range(1, n + 1):
    if left[value] and right[value]:
        answer += 1

print(answer)
\`\`\`

Problem G — Killua and Hunter exam

\`\`\`python
n = int(input())
a = list(map(int, input().split()))

first = {}

for i, value in enumerate(a):
    if value not in first:
        first[value] = i

nodes = sorted(first.items())
m = len(nodes)

left = [-1] * m
right = [-1] * m
stack = []

for i in range(m):
    last = -1

    while stack and nodes[stack[-1]][1] > nodes[i][1]:
        last = stack.pop()

    if stack:
        right[stack[-1]] = i

    if last != -1:
        left[i] = last

    stack.append(i)

root = stack[0]

order = []
stack = [root]

while stack:
    node = stack.pop()
    order.append(node)

    if left[node] != -1:
        stack.append(left[node])

    if right[node] != -1:
        stack.append(right[node])

height = [0] * m
answer = 1

for node in reversed(order):
    left_height = height[left[node]] if left[node] != -1 else 0
    right_height = height[right[node]] if right[node] != -1 else 0

    height[node] = max(left_height, right_height) + 1
    answer = max(answer, left_height + right_height + 1)

print(answer)
\`\`\`

Problem H — Greater Sum Tree

\`\`\`python
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def insert(root, value):
    if root is None:
        return Node(value)

    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)

    return root


def transform(node):
    global total

    if node is None:
        return

    transform(node.right)

    total += node.value
    node.value = total
    result.append(node.value)

    transform(node.left)


n = int(input())
a = list(map(int, input().split()))

root = None

for value in a:
    root = insert(root, value)

total = 0
result = []

transform(root)

print(*result)
\`\`\``);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});
