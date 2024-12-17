from http.server import SimpleHTTPRequestHandler, HTTPServer

class MyHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/wiki':
            self.path = 'wiki.html'
        elif self.path == '/':
            self.path = 'index.html'
        return super().do_GET()

if __name__ == '__main__':
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, MyHandler)
    print("Сервер запущен на http://localhost:8000")
    httpd.serve_forever()
