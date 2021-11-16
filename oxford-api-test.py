import  json
import  requests
import os
from dotenv import load_dotenv

load_dotenv()

app_id = os.getenv("app_id")
app_key = os.getenv("app_key")

endpoint = "entries" #call lemmas first then call inflections of lemmas w endpoint "entries"
lang_1 = "en-us" #TODO: optional lang 2 if lang 2 specified use translations endpoint?
word_id = "miscellaneous"
url = "https://od-api.oxforddictionaries.com/api/v2/" + endpoint + "/" + lang_1 + "/" + word_id.lower()
#TODO: translationsendpoint

r = requests.get(url, headers = {"app_id": app_id, "app_key": app_key})
print("code {}\n".format(r.status_code))
print("text \n" + r.text)
print("json \n" + json.dumps(r.json()))