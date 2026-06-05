# -*- coding: utf-8 -*-
import json
import re
import sys
import base64
import urllib.parse
import requests
from bs4 import BeautifulSoup

sys.path.append('..')
from base.spider import Spider

class Spider(Spider):
    def __init__(self):
        super().__init__()
        self.session = requests.Session()
        self.session.verify = False
        self.host = "https://www.budaichuchen.net"
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36",
            "Referer": f"{self.host}/",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
        }

        self.VIP_HOT_CATES = {
            "tx_vip_hot": {"name": "腾讯VIP热播", "label": "qq"},
            "yk_vip_hot": {"name": "优酷VIP热播", "label": "youku"},
            "bz_vip_hot": {"name": "B站VIP热播", "label": "bli"},
        }

    def getName(self):
        return "枫叶4K"

    def init(self, extend=""):
        pass

    def isVideoFormat(self, url):
        pass

    def manualVideoCheck(self):
        pass

    def destroy(self):
        pass

    # ------------------------------
    # 首页分类
    # ------------------------------
    def homeContent(self, filter):
        classes = [
            {"type_id": "tx_vip_hot", "type_name": self.VIP_HOT_CATES["tx_vip_hot"]["name"]},
            {"type_id": "yk_vip_hot", "type_name": self.VIP_HOT_CATES["yk_vip_hot"]["name"]},
            {"type_id": "bz_vip_hot", "type_name": self.VIP_HOT_CATES["bz_vip_hot"]["name"]},
            {"type_id": "2", "type_name": "电视剧"},
            {"type_id": "1", "type_name": "电影"},
            {"type_id": "4", "type_name": "动漫"},
            {"type_id": "3", "type_name": "综艺"},
            {"type_id": "5", "type_name": "短剧"},
        ]

        filter_dict = {}
        return {"class": classes, "filters": filter_dict}

    # ------------------------------
    # 首页推荐
    # ------------------------------
    def homeVideoContent(self):
        try:
            url = self.host
            res = self.session.get(url, headers=self.headers, timeout=10)
            soup = BeautifulSoup(res.text, "html.parser")
            videos = []
            for item in soup.select(".public-list-box"):
                a = item.select_one(".public-list-exp")
                if not a:
                    continue
                href = a.get("href", "")
                vid_match = re.search(r"/detail/(.*?)\.html", href)
                if not vid_match:
                    continue
                pic = item.select_one("img").get("data-src") or item.select_one("img").get("src", "")
                pic = pic if pic.startswith("http") else self.host + pic
                videos.append({
                    "vod_id": vid_match.group(1),
                    "vod_name": a.get("title", "").strip(),
                    "vod_pic": pic,
                    "vod_remarks": item.select_one(".public-list-prb").text.strip() if item.select_one(
                        ".public-list-prb") else ""
                })
            return {"list": videos[:20]}
        except:
            return {"list": []}

    # ------------------------------
    # 分类列表
    # ------------------------------
    def categoryContent(self, tid, pg, filter, extend):
        page = int(pg)
        try:
            # VIP 专属分类
            if tid in self.VIP_HOT_CATES:
                label = self.VIP_HOT_CATES[tid]["label"]
                if page <= 1:
                    url = f"{self.host}/label/{label}.html"
                else:
                    url = f"{self.host}/label/{label}/page/{page}.html"

                res = self.session.get(url, headers=self.headers, timeout=10)
                soup = BeautifulSoup(res.text, "html.parser")
                videos = []
                for item in soup.select(".public-list-box"):
                    a = item.select_one(".public-list-exp")
                    if not a:
                        continue
                    href = a.get("href", "")
                    vid_match = re.search(r"/detail/(.*?)\.html", href)
                    if not vid_match:
                        continue
                    pic = item.select_one("img").get("data-src") or item.select_one("img").get("src", "")
                    pic = pic if pic.startswith("http") else self.host + pic
                    videos.append({
                        "vod_id": vid_match.group(1),
                        "vod_name": a.get("title", "").strip(),
                        "vod_pic": pic,
                        "vod_remarks": item.select_one(".public-list-prb").text.strip() if item.select_one(
                            ".public-list-prb") else ""
                    })
                return {"list": videos, "page": page, "pagecount": 9999, "limit": 20, "total": 999999}

            # 普通分类
            area = extend.get("area", "")
            by = extend.get("by", "time")
            clazz = extend.get("class", "")
            year = extend.get("year", "")
            lang = extend.get("lang", "")
            letter = extend.get("letter", "")

            url = f"{self.host}/cupfox-list/{tid}-{area}-{by}-{clazz}-{lang}-{letter}---{page}---{year}.html"
            res = self.session.get(url, headers=self.headers, timeout=10)
            soup = BeautifulSoup(res.text, "html.parser")
            videos = []
            for item in soup.select(".public-list-box"):
                a = item.select_one(".public-list-exp")
                if not a:
                    continue
                href = a.get("href", "")
                vid_match = re.search(r"/detail/(.*?)\.html", href)
                if not vid_match:
                    continue
                pic = item.select_one("img").get("data-src") or item.select_one("img").get("src", "")
                pic = pic if pic.startswith("http") else self.host + pic
                videos.append({
                    "vod_id": vid_match.group(1),
                    "vod_name": a.get("title", "").strip(),
                    "vod_pic": pic,
                    "vod_remarks": item.select_one(".public-list-prb").text.strip() if item.select_one(
                        ".public-list-prb") else ""
                })
            return {"list": videos, "page": page, "pagecount": 9999, "limit": 20, "total": 999999}
        except:
            return {"list": [], "page": page, "pagecount": 1, "limit": 20, "total": 0}

    # ------------------------------
    # 搜索
    # ------------------------------
    def searchContent(self, key, quick, pg="1"):
        page = int(pg)
        try:
            url = f"{self.host}/cupfox-search/{urllib.parse.quote(key)}----------{page}---.html"
            res = self.session.get(url, headers=self.headers, timeout=10)
            soup = BeautifulSoup(res.text, "html.parser")
            videos = []
            for item in soup.select(".public-list-box"):
                a = item.select_one(".public-list-exp")
                if not a:
                    continue
                href = a.get("href", "")
                vid_match = re.search(r"/detail/(.*?)\.html", href)
                if not vid_match:
                    continue
                pic = item.select_one("img").get("data-src") or item.select_one("img").get("src", "")
                pic = pic if pic.startswith("http") else self.host + pic
                videos.append({
                    "vod_id": vid_match.group(1),
                    "vod_name": a.get("title", "").strip(),
                    "vod_pic": pic,
                    "vod_remarks": item.select_one(".public-list-prb").text.strip() if item.select_one(
                        ".public-list-prb") else ""
                })
            return {"list": videos, "page": page, "pagecount": 9999, "limit": 20, "total": len(videos)}
        except:
            return {"list": [], "page": page, "pagecount": 1, "limit": 20, "total": 0}

    # ------------------------------
    # 详情页
    # ------------------------------
    def detailContent(self, ids):
        did = ids[0]
        try:
            url = f"{self.host}/detail/{did}.html"
            res = self.session.get(url, headers=self.headers, timeout=10)
            soup = BeautifulSoup(res.text, "html.parser")

            vod_name = soup.select_one(".slide-info-title").text.strip() if soup.select_one(
                ".slide-info-title") else ""
            vod_pic = soup.select_one(".detail-pic img").get("data-src") or soup.select_one(".detail-pic img").get(
                "src", "")
            vod_pic = vod_pic if vod_pic.startswith("http") else self.host + vod_pic
            vod_content = soup.select_one("#height_limit").text.strip() if soup.select_one("#height_limit") else ""

            play_from = []
            play_url = []

            for tab in soup.select(".anthology-tab a"):
                name = tab.text.strip().replace(r"\(\d+\)", "")
                if name:
                    play_from.append(name)

            for box in soup.select(".anthology-list-box"):
                eps = []
                for a in box.select("li a"):
                    name = a.text.strip()
                    href = a.get("href", "")
                    match = re.search(r"/play/(.*?)\.html", href)
                    if match:
                        eps.append(f"{name}${match.group(1)}")
                eps.reverse()
                play_url.append("#".join(eps))

            if not play_from:
                play_from = ["默认线路"]
                eps = []
                for a in soup.select(".anthology-list-play a"):
                    name = a.text.strip()
                    href = a.get("href", "")
                    match = re.search(r"/play/(.*?)\.html", href)
                    if match:
                        eps.append(f"{name}${match.group(1)}")
                eps.reverse()
                play_url = ["#".join(eps)]

            return {
                "list": [{
                    "vod_id": did,
                    "vod_name": vod_name,
                    "vod_pic": vod_pic,
                    "vod_content": vod_content,
                    "vod_play_from": "$$$".join(play_from),
                    "vod_play_url": "$$$".join(play_url)
                }]
            }
        except:
            return {"list": []}

    # ------------------------------
    # 播放解析（支持加密）
    # ------------------------------
    def playerContent(self, flag, pid, vipFlags):
        try:
            url = f"{self.host}/play/{pid}.html"
            res = self.session.get(url, headers=self.headers, timeout=10)
            html = res.text

            match = re.search(r"player_aaaa\s*=\s*(\{.*?\})<", html, re.S)
            if not match:
                return {"parse": 1, "url": url}

            data = json.loads(match.group(1))
            raw = data.get("url", "")
            encrypt = data.get("encrypt", 0)

            if encrypt == 1:
                raw = urllib.parse.unquote(raw)
            elif encrypt == 2:
                raw = urllib.parse.unquote(raw)
                raw = base64.b64decode(raw).decode("utf-8")
                raw = urllib.parse.unquote(raw)

            if raw.startswith("http") and (".m3u8" in raw or ".mp4" in raw):
                return {"parse": 0, "url": raw, "header": self.headers}

            m3u8_match = re.search(r'["\'](https?://.*?\.m3u8.*?)["\']', html)
            if m3u8_match:
                return {"parse": 0, "url": m3u8_match.group(1), "header": self.headers}

            return {"parse": 1, "url": url, "header": self.headers}
        except:
            return {"parse": 1, "url": f"{self.host}/play/{pid}.html", "header": self.headers}