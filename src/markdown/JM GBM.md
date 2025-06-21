# The Next Episode
*By: Jacques Morris*  
*June 2025*

## Quick Recap

As promised in our previous blog post, we have been bulding a new model that was initially scheduled for a 2025 Wimbeldon release. But with some good luck and hard work from the team we have successfully deployed our first test/research trades this weekend at the WTA Bad Homburg, WTA Berlin, and Queens ATP events. We look forward to sharing some preliminary results with you as soon as we have them but in the meantime we hope that this brief explainer on our approach is of interest to our small but extreemly smart and handsome readers.


## How We Built a Winning Tennis Prediction Model

At our core, we love tennis—its intricacies, rivalries, and the constant thrill of the unexpected. But when it comes to forecasting match outcomes, passion alone isn't enough. Enter data science: our ace in the hole.

## Starting Simple: Elo Ratings

Our first model began with the fundamentals: player Elo ratings. Inspired by the effectiveness of our successful NFL prediction model, we adapted the Elo system for tennis. Elo ratings, both overall and surface-specific, provided a clear, intuitive measure of player skill based on historical outcomes. Just as our NFL Elo ratings captured team strength to predict game outcomes, tennis Elo ratings offered a robust baseline by quantifying player performances and their dynamics over time.

## Expanding the Toolkit: Random Forests

With our baseline established, we quickly realized that Elo alone couldn't capture all the nuances of tennis matchups. We turned to Random Forest classifiers for their versatility and interpretability. This allowed us to incorporate additional features such as rankings, age differences, head-to-head histories, betting odds, and home-court advantages. Random Forests significantly improved our predictive power and helped us better understand feature importance.

## Advancing to Gradient Boosting Trees

As our dataset expanded and the complexity of interactions grew, we identified opportunities for further refinement. Gradient boosting trees emerged as a clear next step. Unlike Random Forests, gradient boosting trees build sequentially on previous predictions, systematically reducing errors and capturing intricate interactions within our data more effectively.

## The Importance of Parameter Tuning

The shift to gradient boosting was complemented by meticulous parameter tuning. Adjusting parameters such as learning rates, tree depth, and the number of estimators allowed us to fine-tune our model meticulously, optimizing it specifically for our goal: accurate and confident predictions.

## Why Log-Loss?

We chose log-loss as our primary optimization metric because it measures not just accuracy but also the confidence of predictions. Low log-loss indicates a model that reliably distinguishes between closely matched players, ensuring our predictions weren't merely correct, but also confident and robust, particularly crucial in betting scenarios.

## Benchmarking and Results

When tested against matches after 2023, our refined gradient boosting model achieved impressive accuracy (~70%) and consistently low log-loss scores. These results underline not just predictive capability but the reliability and precision of our model.

## What's Next?

As tennis evolves, so will our model. Future updates may include deeper player-specific metrics, in-match dynamics, or even sentiment analysis from player interviews. Additionally, we're exploring applying our methodology to new sports, bringing the same analytical rigor and excitement to even more fans. For now, we're excited to keep serving up reliable, insightful tennis predictions that make watching the game even more thrilling.
