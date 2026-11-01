# Deep Learning Playbook

**Live site: https://swagatambaz.github.io/deep-learning-playbook/**

An interactive, topic-by-topic deep learning course built for **Data Scientist II interview prep**. It goes from zero to the judgement calls interviewers probe.

Every topic has four layers, plus a **🔍 Visualise it** section with runnable plotting code:

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
| 03 | [PyTorch I: Tensors & autograd](pt-tensors.html) | Shapes, broadcasting, indexing, einsum, autograd graph, custom Functions *(shape lab, broadcasting checker, live graph)* |
| 04 | [PyTorch II: Modules, data & loop](pt-training.html) | nn.Module, Dataset/DataLoader, samplers, optimizers, schedulers, fit() template *(sampler + scheduler visualisers)* |
| 05 | [PyTorch III: Speed, memory & scale](pt-performance.html) | Profiling, AMP, torch.compile, memory, OOM playbook, DDP/FSDP2, export *(GPU memory estimator)* |
| 06 | [Visualisation & debugging toolkit](visualization.html) | TensorBoard, W&B, torchinfo, torchviz, Captum, embeddings, eval plots *(dashboard reader, ROC/PR/calibration)* |
| 07 | [PyTorch coding drills](pt-drills.html) | 24 from-scratch exercises with verified tests |
| 08 | [Tabular DL](tabular.html) | Why GBDTs win, entity embeddings, TabNet, FT-Transformer, hybrids |
| 09 | [CNNs](cnn.html) | Convolution, architecture history (LeNet → ConvNeXt V2 → DINOv3), transfer learning *(live convolution, conv calculator)* |
| 10 | [CV II: Detection & segmentation](cv-detection.html) | IoU, NMS, mAP, YOLO/Faster R-CNN/DETR family, U-Net, Mask R-CNN, SAM 3, OCR, tracking, face match *(IoU + NMS playgrounds)* |
| 11 | [CV III: Vision performance playbook](cv-performance.html) | Diagnose by symptom, data levers, augmentation, fine-tuning recipe, hyperparameter table, backbone choice, TTA, quantisation *(augmentation preview)* |
| 12 | [Sequences I: RNN](rnn.html) | Task shapes, recurrence, BPTT, vanishing/exploding gradients, shapes, packing *(step-through simulator, parameter calculator)* |
| 13 | [Sequences II: LSTM](lstm.html) | Gates and cell state, why gradients survive, parameters, variants, tuning, bugs, industry designs *(LSTM cell simulator)* |
| 14 | [Sequences III: GRU](gru.html) | Update/reset gates, LSTM vs GRU, GRU4Rec, GRU-D *(GRU cell simulator)* |
| 15 | [Transformers](transformers.html) | Q/K/V, √d scaling, multi-head, positional encoding, BERT vs GPT *(attention heatmap)* |
| 16 | [Embeddings & NLP](nlp.html) | Word2Vec → BERT, tokenisation, semantic search, fine-tuning |
| 17 | [Recommender systems](recsys.html) | Funnel, MF, two-tower, DCN/DLRM/DIN, NDCG, cold start |
| 18 | [Time series](timeseries.html) | DeepAR, TFT, N-HiTS, PatchTST, foundation models, walk-forward CV |
| 19 | [Anomaly & GNNs](anomaly.html) | Autoencoders, GraphSAGE/GAT for fraud rings & AML |
| 20 | [Generative AI & LLMs](genai.html) | VAE/GAN/diffusion, RLHF/DPO, RAG, LoRA, evaluation |
| 21 | [Industry playbook](industry.html) | Fintech, banking, e-commerce, insurance, logistics, healthcare, telecom, ads, manufacturing |
| 22 | [Which model when?](chooser.html) | Interactive model chooser + cheat sheets |
| 23 | [Model encyclopedia](models.html) | 62 models: intuition, key parameters with starting values, how to improve, when to use/avoid, interview point |
| 24 | [Production & explainability](production.html) | Serving, quantisation, drift (PSI), calibration, SHAP, fairness |
| 25 | [Interview question bank](interview.html) | 81 questions (incl. 21 computer vision) with flashcard mode |

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
