from flask import Flask, render_template
import os

tmpl_dir = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__, template_folder=tmpl_dir)
app.config['DEBUG'] = True

@app.route('/')
def display():
    return render_template('main.html')

if __name__ == '__main__':
    app.run()
