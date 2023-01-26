# Link Prediction

## Introduction

- Link prediction is the problem of predicting the existence of links between 2 entities in a network.
- Examples: 
    - predicting friendship links in a social network
    - interaction between genes in a biological network
    - predict links at time $t+1$ when network is given at time $t$

## Problem Definition

- Given a network $G = (V, E)$ where $V$ represents the entity nodes and E represents the true links in the network represented by ${ E\subset |V| \times |V|}$ (also called observed links).
- **Temporal formulation:** predict the links at time $t+1$ given links at time $t$
- **Binary classification formulation:** potential links $E'$ are classified as either true or false ie. $E' \to \{0, 1\}$
- **Probability estimation formula**: potential links $E'$ are associated with probabilities ie. $E' \to [0, 1]$

## Terminologies

### Small World Phenomena

The observation that one can find a short chain of acquaintances, often no more than a handful of individuals.

### Power Law

Vast majority of nodes have very few connections, while a few important nodes have a huge number of connections.




---

# Paper Reviews

## Link Prediction Techniques, Applications, and Performance: A Survey

### Introduction

- Use Cases:
    - hyperlink prediction/creation
    - recommendation systems
    - protein-protein interactions (PPI)
    - terrorist links
- Likelihood of 2 people to work together on a paper was dependent on number of colleagues they have in common, number of researchers they have worked in the past etc.
- For friend-friend interactions, similarities increase the rank of node pairs.
- **Evolution model:** considers small world phenomena, power-law degree distribution. Difference between link prediction model and the evolution model is that the former focuses on global characteristics of the network while the latter on local to predict missing links.
- For large networks, matrix factorization is used for pair-wise similarity prediction rather than traditional algorithms (tensor is an extension of matrix factorization and richer).
- **Approaches for Link Prediction:**
    1. Similarity based
    2. Probabilistic and Maximum Likelihood based
    3. Dimension Reductionality based
    4. Others

### Methods

#### Similarity Based

Pairs of nodes $x, y$ are assigned a similarity score $S(x, y)$ and links are predicted on the basis of these scores.

1. **Common Neighbors:** This performs the best in real world scenarios and often outperforms more complex methods. $S(x, y) = |\Gamma(x) \cap \Gamma(y)|$ where $\Gamma(x)$ gives the number of neighbors of node $x$.

2. **Jaccard Coefficient:** This is similar to Common Neighbors, but it is normalised by dividing by the total neighbors they have. $S(x, y) = |\frac {\Gamma(x) \cap \Gamma(y)|} {\Gamma(x) \cup \Gamma(y)|}$ This sometimes underperforms compared to common neighbor method.

3. **Adamic/Adar Index:** Used to cacluclate similarity score between 2 web pages. $S(x, y) = \sum_{z \in \Gamma(x) \cap \Gamma(y)} 1/\log(k_z)$ where $k_z$ is the degree of the node $z$. This is intuitive, a person with more friends will spend less time/resource with an individual friend than one who has lesser friends.

