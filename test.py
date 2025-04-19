import requests
import os
from urllib.parse import urlparse

# Lista linków do zdjęć
links = [
    "https://i.postimg.cc/Vk1KW4Lg/10.jpg",
    "https://i.postimg.cc/cLmX9YvS/11.jpg",
    "https://i.postimg.cc/fbq5ZN7q/12.jpg",
    "https://i.postimg.cc/wBjFSvNs/13.jpg",
    "https://i.postimg.cc/bJGgwB3y/14.jpg",
    "https://i.postimg.cc/KzdNkDHn/15.jpg",
    "https://i.postimg.cc/d3r98Zbg/16.jpg",
    "https://i.postimg.cc/QNTSLvFS/17.jpg",
    "https://i.postimg.cc/qqVsMMNw/logo.png",
    "https://i.postimg.cc/tgryjYM0/1.jpg",
    "https://i.postimg.cc/zG7YCy5L/10.jpg",
    "https://i.postimg.cc/JhdwFSsM/11.jpg",
    "https://i.postimg.cc/xddDt9T6/12.jpg",
    "https://i.postimg.cc/1zRP2pMc/2.jpg",
    "https://i.postimg.cc/G2HRhdW4/3.jpg",
    "https://i.postimg.cc/0QFszhvc/4.jpg",
    "https://i.postimg.cc/T1bXgQYG/5.jpg",
    "https://i.postimg.cc/3r0hsrj6/6.jpg",
    "https://i.postimg.cc/xTK2ds43/7.jpg",
    "https://i.postimg.cc/28pYrp25/8.jpg",
    "https://i.postimg.cc/htcqQLFW/9.jpg",
    "https://i.postimg.cc/JnJvFds3/2463be34-2940-427c-9362-4be99b6c3e65.jpg",
    "https://i.postimg.cc/W4xxXP1b/a3f3f536-596f-43aa-8a7c-72719e5b482a.jpg",
    "https://i.postimg.cc/SRdTF0k9/8ef91aa3-56b6-4692-bcfb-dfd61671019b.jpg"
]

# Tworzymy folder (jeśli chcesz)
os.makedirs("pobrane_zdjecia", exist_ok=True)

for url in links:
    try:
        # Pobierz nazwę pliku z linku
        parsed_url = urlparse(url)
        filename = os.path.basename(parsed_url.path)
        filepath = os.path.join("pobrane_zdjecia", filename)

        # Pobieranie pliku
        response = requests.get(url)
        response.raise_for_status()

        with open(filepath, "wb") as f:
            f.write(response.content)
        
        print(f"Pobrano: {filename}")

    except Exception as e:
        print(f"Błąd podczas pobierania {url}: {e}")
