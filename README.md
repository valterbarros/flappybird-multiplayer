# Explains about this project
I wanted test the channels functionality from rails in some project and I get this from here (https://www.youtube.com/watch?v=cWytvkJPlMw), basically I get the original code and made a lot of refactors like put all code in es6 sintax and use import and export modules from webpack to increase the readbility from code, for now I'm woking to keep users synchronized about otheres players in match.

Add other things is yet necessary like login system, etc.

# Structure
All css and js code lives in frontend path, the compile is made with webpack using webpacker gem to facilite my life.

# To run you will need
``` bash
  # install dependencies
  yarn
  bundle install
```
``` bash
  # open a tab in terminal and run webpack compile
  npm run dev
```
``` bash
  # open other tab in terminal and run rails server
  rails s
```

# Real screens from project
![](https://trello-attachments.s3.amazonaws.com/5b5523894f83f86d1d846475/5b5523894f83f86d1d846493/4ab8d3169fd21dce781ba3da13b83673/image.png)