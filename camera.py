import cv2
import mediapipe as mp
import numpy as np
import socket
import struct
import pickle
import threading
import time

# Настройки сокета
HOST = '26.130.36.51'  # IP адрес сервера
PORT = 5050            # Порт для соединения

# Параметры видеопотока
cap = cv2.VideoCapture(0)
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils

# Подключение к серверу
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((HOST, PORT))

# Функция для отправки данных
def send_data(client_socket, data):
    serialized_data = pickle.dumps(data)
    client_socket.sendall(struct.pack(">L", len(serialized_data)) + serialized_data)

# Функция для получения данных
def receive_data(client_socket):
    try:
        data_len = struct.unpack(">L", client_socket.recv(4))[0]
        data = b""
        while len(data) < data_len:
            packet = client_socket.recv(data_len - len(data))
            if not packet:
                return None
            data += packet
        return pickle.loads(data)
    except:
        return None

# Поток для получения видеопотока от другого клиента
received_frame = None
def receive_video():
    global received_frame
    while True:
        data = receive_data(sock)
        if data is not None:
            # Получаем видеокадр
            received_frame = cv2.imdecode(np.frombuffer(data["frame"], np.uint8), cv2.IMREAD_COLOR)
        else:
            break

# Запуск потока для приема видеопотока
threading.Thread(target=receive_video, daemon=True).start()

# Основной цикл захвата и отображения кадров
with mp_hands.Hands(min_detection_confidence=0.8, min_tracking_confidence=0.8) as hands:
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            print("Не удалось получить изображение с веб-камеры.")
            break

        # Уменьшаем разрешение кадра для оптимизации
        frame = cv2.resize(frame, (320, 240))

        # Переводим изображение в RGB (MediaPipe использует RGB)
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(frame_rgb)

        # Обработка жестов рук
        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

        # Кодируем кадр в формате JPEG и отправляем его на сервер каждые 3 кадра
        if int(time.time() * 1000) % 3 == 0:
            _, frame_encoded = cv2.imencode('.jpg', frame, [int(cv2.IMWRITE_JPEG_QUALITY), 50])  # Увеличиваем сжатие
            send_data(sock, {"frame": frame_encoded.tobytes()})

        # Объединяем кадры: свой и полученный
        if received_frame is not None:
            combined_frame = np.hstack((frame, received_frame))
        else:
            combined_frame = frame

        # Показываем изображение с нарисованными руками и кубиком
        cv2.imshow("Shared Interaction", combined_frame)

        # Нажмите 'q', чтобы выйти из цикла
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

# Освобождаем ресурсы
cap.release()
cv2.destroyAllWindows()
sock.close()
