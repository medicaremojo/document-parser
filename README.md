# Medicare Document Parser

Parses PDFs and strips out relevant text


```bash
curl -i -u "<username>":"<password>" \
-F training_data=@<path_to_file>/weather_data_train.csv \
-F training_metadata="{\"language\":\"en\",\"name\":\"TutorialClassifier\"}" \
"https://gateway.watsonplatform.net/natural-language-classifier/api/v1/classifiers"
```
