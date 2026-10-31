# Deep Learning Playbook

An interactive, topic-by-topic deep learning course built for **Data Scientist II interview prep**. It goes from zero to the judgement calls interviewers probe.

Every topic has four layers:

- **Plain English**: the intuition with no jargon
- **Maths**: only what you'd write on a whiteboard
- **Code**: copy-ready PyTorch / Hugging Face snippets
- **Interview points**: the trade-offs and Q&A that come up most

## Topics

| # | Page | What you'll learn |
|---|------|-------------------|
| 00 | [Start here & roadmap](index.html) | 8-week plan, setup, the universal training loop |
| 01 | [Foundations](foundations.html) | Neuron, activations, loss, gradient descent, backprop *(neuron playground)* |
| 02 | [Training & improving models](training.html) | Optimizers, LR, init, norm, regularisation, imbalance, debugging *(GD visualiser, loss-curve doctor)* |
| 03 | [Tabular DL](tabular.html) | Why GBDTs win, entity embeddings, TabNet, FT-Transformer, hybrids |
| 04 | [CNNs](cnn.html) | Convolution, ResNet, transfer learning, detection/segmentation *(live convolution)* |
| 05 | [RNN / LSTM / GRU](rnn.html) | BPTT, vanishing gradients, gates *(gradient decay plot)* |
| 06 | [Transformers](transformers.html) | Q/K/V, √d scaling, multi-head, positional encoding, BERT vs GPT *(attention heatmap)* |
| 07 | [Embeddings & NLP](nlp.html) | Word2Vec → BERT, tokenisation, semantic search, fine-tuning |
| 08 | [Recommender systems](recsys.html) | Funnel, MF, two-tower, DCN/DLRM/DIN, NDCG, cold start |
| 09 | [Time series](timeseries.html) | DeepAR, TFT, N-HiTS, PatchTST, foundation models, walk-forward CV |
| 10 | [Anomaly & GNNs](anomaly.html) | Autoencoders, GraphSAGE/GAT for fraud rings & AML |
| 11 | [Generative AI & LLMs](genai.html) | VAE/GAN/diffusion, RLHF/DPO, RAG, LoRA, evaluation |
| 12 | [Industry playbook](industry.html) | Fintech, banking, e-commerce, insurance, logistics, healthcare, telecom, ads, manufacturing |
| 13 | [Which model when?](chooser.html) | Interactive model chooser + cheat sheets |
| 14 | [Production & explainability](production.html) | Serving, quantisation, drift (PSI), calibration, SHAP, fairness |
| 15 | [Interview question bank](interview.html) | 60 questions with flashcard mode |

## Run locally

It's a plain static site with no build step and no dependencies.

```bash
git clone https://github.com/SWAGATAMBAZ/deep-learning-playbook.git
cd deep-learning-playbook
python -m http.server 8000   # then open http://localhost:8000
```

Progress (topics done, flashcards known) is saved in your browser's localStorage.

## Hosting

GitHub Pages serves this repo directly: **Settings → Pages → Deploy from branch → `main` / root**.
