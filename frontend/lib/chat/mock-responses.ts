interface MockTopic {
  keywords: string[]
  response: string
}

const TOPICS: MockTopic[] = [
  {
    keywords: ['algorithm', 'supervised', 'random forest', 'svm', 'regression', 'classification', 'machine learning'],
    response: `Great question. Machine learning algorithms fall into a few families, and picking the right one depends on your **data**, your **target**, and how much **interpretability** you need.

### Supervised learning
- **Linear & Logistic Regression** — fast, interpretable baselines. Always start here.
- **Decision Trees / Random Forests** — handle non-linear relationships and mixed feature types with little preprocessing.
- **Gradient Boosting (XGBoost, LightGBM)** — the go-to for tabular data competitions.
- **Support Vector Machines** — strong on small-to-medium, high-dimensional datasets.

### Unsupervised learning
- **K-Means** for clustering, **PCA** for dimensionality reduction, and **DBSCAN** for density-based groupings.

Here's a quick baseline with scikit-learn:

\`\`\`python
from sklearn.datasets import load_breast_cancer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score

X, y = load_breast_cancer(return_X_y=True)
model = RandomForestClassifier(n_estimators=200, random_state=42)

scores = cross_val_score(model, X, y, cv=5, scoring="accuracy")
print(f"Accuracy: {scores.mean():.3f} ± {scores.std():.3f}")
\`\`\`

> **Rule of thumb:** a well-tuned simple model beats a poorly-tuned complex one. Establish a baseline, then iterate.`,
  },
  {
    keywords: ['python', 'numpy', 'pandas', 'library', 'libraries', 'code'],
    response: `Python dominates AI because of its ecosystem. Here's the core stack worth mastering, in order:

1. **NumPy** — vectorized array math; the foundation of everything else.
2. **Pandas** — loading, cleaning, and reshaping tabular data.
3. **Matplotlib / Seaborn** — visualizing distributions and results.
4. **scikit-learn** — classical ML with a consistent \`fit\` / \`predict\` API.
5. **PyTorch** — deep learning with an intuitive, Pythonic design.

The single most important habit is **vectorization** — replacing Python loops with array operations:

\`\`\`python
import numpy as np

x = np.random.rand(1_000_000)

# Slow: pure Python loop
total = sum(v * 2 for v in x)

# Fast: vectorized (often 50-100x quicker)
total = (x * 2).sum()
\`\`\`

Want me to put together a 4-week learning path for this stack?`,
  },
  {
    keywords: ['math', 'mathematics', 'linear algebra', 'calculus', 'probability', 'statistics', 'gradient'],
    response: `You don't need a math degree for ML — but three areas pay off enormously:

### 1. Linear Algebra
Data is stored as vectors and matrices. A neural network layer is just a matrix multiply plus a bias: \`y = Wx + b\`. Focus on **dot products**, **matrix multiplication**, and **eigenvectors** (the core of PCA).

### 2. Calculus
Training is optimization. **Gradients** tell you which direction reduces the loss, and the **chain rule** is exactly what backpropagation computes.

### 3. Probability & Statistics
Models make uncertain predictions. Learn **distributions**, **Bayes' theorem**, **expectation**, and **variance** to reason about them.

Here's gradient descent from scratch to tie it together:

\`\`\`python
import numpy as np

X = np.random.rand(100, 1)
y = 3 * X.squeeze() + 2 + np.random.randn(100) * 0.1

w, b, lr = 0.0, 0.0, 0.1
for _ in range(1000):
    pred = w * X.squeeze() + b
    dw = 2 * np.mean((pred - y) * X.squeeze())
    db = 2 * np.mean(pred - y)
    w, b = w - lr * dw, b - lr * db

print(f"w={w:.2f}, b={b:.2f}")  # ≈ w=3.00, b=2.00
\`\`\``,
  },
  {
    keywords: ['deep learning', 'neural', 'network', 'backprop', 'cnn', 'transformer', 'pytorch', 'layer'],
    response: `Deep learning is machine learning with **neural networks** that learn layered representations of data. Here's the mental model:

- **Neurons** compute a weighted sum of inputs, then apply a non-linear **activation** (ReLU, GELU).
- **Layers** stack neurons; depth lets the network learn increasingly abstract features.
- **Loss functions** measure error — cross-entropy for classification, MSE for regression.
- **Backpropagation** computes gradients of the loss w.r.t. every weight.
- **Optimizers** like Adam use those gradients to update weights.

A minimal PyTorch training loop:

\`\`\`python
import torch
from torch import nn

model = nn.Sequential(
    nn.Linear(784, 256),
    nn.ReLU(),
    nn.Dropout(0.2),
    nn.Linear(256, 10),
)
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)
loss_fn = nn.CrossEntropyLoss()

for images, labels in train_loader:
    optimizer.zero_grad()
    loss = loss_fn(model(images.view(-1, 784)), labels)
    loss.backward()
    optimizer.step()
\`\`\`

From here, the main architectures to explore are **CNNs** (images), **RNNs/LSTMs** (sequences), and **Transformers** (nearly everything today).`,
  },
]

const FALLBACK = `That's a great topic to explore. Here's how I'd approach it:

1. **Clarify the goal** — what problem are you solving, and how will you measure success?
2. **Understand the data** — its size, quality, and the features available.
3. **Start simple** — build a baseline before reaching for complex models.
4. **Iterate with evaluation** — use a held-out validation set and track metrics.

I can go deeper on **ML algorithms**, **Python for AI**, **the math behind ML**, or **deep learning fundamentals**. Which would be most useful?`

export function getMockResponse(prompt: string): string {
  const normalized = prompt.toLowerCase()
  const match = TOPICS.find((topic) =>
    topic.keywords.some((keyword) => normalized.includes(keyword)),
  )
  return match?.response ?? FALLBACK
}

export function deriveTitle(prompt: string): string {
  const clean = prompt.replace(/\s+/g, ' ').trim()
  return clean.length > 42 ? `${clean.slice(0, 42).trimEnd()}…` : clean
}
