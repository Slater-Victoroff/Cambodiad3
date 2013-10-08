from flask import Flask, render_template
import os

tmpl_dir = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__, template_folder=tmpl_dir)
app.config['DEBUG'] = True

@app.route('/')
def display():
    return render_template('main.html')

@app.route('/bubble')
def bubble():
    return render_template('bubble.html')

@app.route('/bubble2')
def bubble2():
    return render_template('bubble2.html')

@app.route('/graph')
def graph():
    return render_template("graph.html")

if __name__ == '__main__':
    app.run(port = os.environ['PORT'])
