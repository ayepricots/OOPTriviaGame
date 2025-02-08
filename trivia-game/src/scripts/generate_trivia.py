import openai
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Retrieve API key
openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_trivia(category):
    prompt = f"Generate a JSON array of 5 multiple-choice trivia questions about {category}. Each question should have a 'question', 'options' (list of 4), and a 'correct_answer'."
    
    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
        messages=[{"role": "system", "content": "You are a trivia question generator."},
                  {"role": "user", "content": prompt}],
        temperature=0.7
    )
    
    trivia_json = response["choices"][0]["message"]["content"]
    return trivia_json

if __name__ == "__main__":
    import sys
    category = sys.argv[1] if len(sys.argv) > 1 else "OOP"
    print(generate_trivia(category))
