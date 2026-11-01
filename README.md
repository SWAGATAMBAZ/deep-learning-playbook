# Deep Learning Playbook

**Live site: https://swagatambaz.github.io/deep-learning-playbook/**

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
| 04 | [CNNs](cnn.html) | Convolution, architecture history (LeNet → ConvNeXt V2 → DINOv3), transfer learning *(live convolution, conv calculator)* |
| 05 | [CV II: Detection & segmentation](cv-detection.html) | IoU, NMS, mAP, YOLO/Faster R-CNN/DETR family, U-Net, Mask R-CNN, SAM 3, OCR, tracking, face match *(IoU + NMS playgrounds)* |
| 06 | [CV III: Vision performance playbook](cv-performance.html) | Diagnose by symptom, data levers, augmentation, fine-tuning recipe, hyperparameter table, backbone choice, TTA, quantisation *(augmentation preview)* |
| 07 | [RNN / LSTM / GRU](rnn.html) | BPTT, vanishing gradients, gates *(gradient decay plot)* |
| 08 | [Transformers](transformers.html) | Q/K/V, √d scaling, multi-head, positional encoding, BERT vs GPT *(attention heatmap)* |
| 09 | [Embeddings & NLP](nlp.html) | Word2Vec → BERT, tokenisation, semantic search, fine-tuning |
| 10 | [Recommender systems](recsys.html) | Funnel, MF, two-tower, DCN/DLRM/DIN, NDCG, cold start |
| 11 | [Time series](timeseries.html) | DeepAR, TFT, N-HiTS, PatchTST, foundation models, walk-forward CV |
| 12 | [Anomaly & GNNs](anomaly.html) | Autoencoders, GraphSAGE/GAT for fraud rings & AML |
| 13 | [Generative AI & LLMs](genai.html) | VAE/GAN/diffusion, RLHF/DPO, RAG, LoRA, evaluation |
| 14 | [Industry playbook](industry.html) | Fintech, banking, e-commerce, insurance, logistics, healthcare, telecom, ads, manufacturing |
| 15 | [Which model when?](chooser.html) | Interactive model chooser + cheat sheets |
| 16 | [Model encyclopedia](models.html) | 62 models: intuition, key parameters with starting values, how to improve, when to use/avoid, interview point |
| 17 | [Production & explainability](production.html) | Serving, quantisation, drift (PSI), calibration, SHAP, fairness |
| 18 | [Interview question bank](interview.html) | 81 questions (incl. 21 computer vision) with flashcard mode |

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
