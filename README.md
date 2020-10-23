<img src="https://cdn.glitch.com/224c8078-ad94-4e2c-9def-73ccac926363%2Fnopedatabase.png" alt="nope.db" />

[![nope.db](https://img.shields.io/badge/nope-db-black.svg)](https://www.npmjs.org/package/nope.db)
[![npm version](https://img.shields.io/npm/v/nope.db.svg?style=flat-square)](https://www.npmjs.org/package/nope.db)
[![install size](https://packagephobia.now.sh/badge?p=nope.db)](https://packagephobia.now.sh/result?p=nope.db)
[![npm downloads](https://img.shields.io/npm/dm/nope.db.svg?style=flat-square)](http://npm-stat.com/charts.html?package=nope.db)
[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jesuswasmychoice/nope.db/blob/main/LICENSE)
[![Discord](https://img.shields.io/discord/747043879726874734?color=%237289DA&label=Discord)](https://discord.gg/trDF8fb)

> Node.js için basit, kullanışlı JSON database.

> Simple, convenient JSON database for node.js.

# Sayfa İçeriği / Page Content

- [Kurulum / Installation](#installation)
- [Tanımlama / Definition](#definition)
- [Destek / Support](#support)
- [Metotlar / Methods](#methods)
- [Örnekler / Examples](#examples)

> Linklere tıklayarak ilgili bölüme gidebilirsiniz.

> By clicking on the links, you can go to the relevant section.

<div id ="definition">

<hr>

# Yenilikler / Updates

- [Gitmek için tıkla / Click to go](https://github.com/jesuswasmychoice/nope.db/blob/main/CHANGELOG.md)

</div>

<div id ="installation">

<hr>

# Kurulum / Installation

```console
$ npm install nope.db
```

</div>

<div id ="definition">

<hr>

# Tanımlama / Definition

```js
const db = require("nope.db");
```

</div>


<div id="support">

<hr>

# Destek / Support

- Destek Adresleri / Support Adresses
  - [Instagram](https://www.instagram.com/metehanardamutlu/)
  - [Discord Sunucum](https://discord.gg/trDF8fb)

</div>

<div id="methods">

<hr>

# Metotlar / Methods

- [.get()](#get)
  - [.fetch()](#get)
- [.set()](#set)
- [.delete()](#delete)
  - [.remove()](#delete)
- [.push()](#push)
- [.add()](#add)
- [.subtract()](#subtract)
- [.has()](#has)
- [.all()](#all)
- [.clear()](#clear)
  - [.reset()](#clear)
- [.backup()](#backup)
- [.loadBackup()](#loadBackup)

</div>

<div id="examples">

# Örnekler / Examples

<div id="get">

<hr>

- [.get()](#get) Örnekleri / Examples:
> [.get()](#get) metodunda, database'den girdiğiniz id'ye ait olan veriyi çeker.

> In the [.get()](#get) method, it pulls the data that belongs to the ID that you enter from the database.

```js
/*
Database'deki veri / Data in the database:

{
  "test": "hello",
  "testing": {
    "nope": "db"
  }
}
*/

db.get('test'); // -> "hello"
db.get('testing'); // -> { nope: 'db' }
db.get('testing.nope'); // -> "db"
```
</div>

<hr>

<div id="set">

<hr>

- [.set()](#set) Örnekleri / Examples:
> [.set()](#set) metodunda, girdiğiniz değeri database'de ait olan id'ye kaydeder.

> In the [.set()](#set) method, saves the value you entered in the ID belonging to the database.

```js
db.set('test', 'hello'); // -> "hello"
db.set('testing', { nope: 'db' }); // -> { nope: "db" }
db.set('nope.db', ["hi"]); // -> ["hi"]
db.set('bank.nopeion.money', 500); // -> 500

/*
Elde edilen veri / Obtained data:

{
  "test": "hello",
  "testing": {
    "nope": "db"
  },
  "nope": {
    "db": [
      "hi"
    ]
  },
  "bank": {
    "nopeion": {
      "money": 500
    }
  }
}
*/
```

</div>

<hr>

<div id="delete">

<hr>

- [.delete()](#delete) Örnekleri / Examples:
> [.delete()](#delete) metodunda, girdiğiniz id'yi database'den siler.

> In the [.delete()](#delete) method, deletes the ID you entered from the database.

```js
/*
Silinmeden önce database'deki veri / Data from before deletion:

{
  "test": "hello",
  "testing": {
    "nope": "db"
  },
  "nope": {
    "db": [
      "hi"
    ]
  },
  "bank": {
    "nopeion": {
      "money": 500
    }
  }
}
*/

db.delete('test'); // -> true
db.delete('testing.nope'); // -> true
db.delete('nope'); // -> true
db.delete('hello'); // -> false
db.delete('bank.nopeion.test'); // -> true

/*
Silindikten sonra database'deki veri / Data from after deletion:

{
  "testing": {},
  "bank": {
    "nopeion": {
      "money": 500
    }
  }
}
*/
```

</div>

<hr>

<div id="push">

---

- [.push()](#push) Örnekleri / Examples:
> [.push()](#push) metodunda, girdiğiniz id'ye ait olan verideki array'in içine, girmiş olduğunuz değeri ekler.

> In the [.push()](#push) method, adds the value you entered into the array in the data belonging to the ID you entered.

```js
db.push('test', 'nope.db'); // -> [ 'nope.db' ]
db.push('test', 'hello'); // -> [ 'nope.db', 'hello' ]
db.push('testing', { name: 'nope.db', version: 'beta' }); // -> [ { name: 'nope.db', version: 'beta' } ]
db.push('testing', { name: 'nopeion', version: 'alpha' }); // -> [ { name: 'nopeion', version: 'alpha' } ]
db.push('nopeion.testing', { number: 1, date: Date.now().toString() }); // -> [ { number: 1, date: 1602549127632 } ]
db.push('nopeion.testing', { number: 2, date: Date.now().toString() }); // -> [ { number: 2, date: 1602549127637 } ]

/*
Database'e kaydedilen veri / Data saved in the database:

{
  "test": [
    "nope.db",
    "hello"
  ],
  "testing": [
    {
      "name": "nope.db",
      "version": "beta"
    },
    {
      "name": "nopeion",
      "version": "alpha"
    }
  ],
  "nopeion": {
    "testing": [
      {
        "number": 1,
        "date": "1602549127632"
      },
      {
        "number": 2,
        "date": "1602549127637"
      }
    ]
  }
}
*/
```

</div>

<hr>

<div id="add">

<hr>

- [.add()](#add) Örnekleri / Examples:
> [.add()](#add) metodunda, girmiş olduğunuz id'deki sayı ile girmiş olduğuz değeri toplar ve kaydeder.

> In the [.add()](#add) method, collects and saves the value we entered with the number in the ID you entered.

```js
/*
Database'deki veri / Data in the database:

{
  "bank": {
      nopeion: {
          money: 50
      }
  }
}
*/

db.add('bank.nopeion.money', 50); // -> 100
db.add('bank.nopeion.money', 400); // -> 500
```

</div>

<hr>

<div id="subtract">

<hr>

- [.subtract()](#subtract) Örnekleri / Examples:
> [.subtract()](#subtract) metodunda, girmiş olduğunuz id'deki sayıdan ile girmiş olduğuz değeri çıkarır ve kaydeder.

> In the [.subtract()](#subtract) method, subtracts and saves the value that you entered from the number in the ID that you entered.

```js
/*
Database'deki veri / Data in the database:

{
  "bank": {
      nopeion: {
          money: 500
      }
  }
}
*/

db.subtract('bank.nopeion.money', 50); // -> 450
db.subtract('bank.nopeion.money', 400); // -> 50
```

</div>

<hr>

<div id="has">

<hr>

- [.has()](#has) Örnekleri / Examples:

> [.has()](#has) metodunda, girdiğiniz id'yi database'den kontrol eder.

> In the [.has()](#has) method, checks the ID you entered from the database.

```js
/*
Database'deki veri / Data in the database:

{
  "nopeion": {
    "money": 800
  },
  "test": {
    "money": 250
  }
}
*/

db.has('nopeion.money'); // -> true
db.has('nopeion.password'); // -> false
db.has('test'); // -> true
db.has('testing'); // -> false
```

</div>

<hr>

<div id="all">

<hr>

- [.all()](#all) Örnekleri / Examples:
> [.all()](#all) metodunda, veritabanındaki tüm verileri çeker.

> In the [.all()](#all) method, pulls all the data in the database.

```js
/*
Database'deki veri / Data in the database:

{
  "nope": {
    "db": [
      "testing",
      "hello"
    ]
  },
  "test": [
    "nope.db"
  ],
  "testing": [
    {
      "name": "nope.db",
      "version": "beta"
    }
  ],
  "nopeion": {
    "testing": [
      {
        "number": 2,
        "date": "1602520473968"
      }
    ]
  }
}
*/

db.all() //-> { nope: { db: [ 'testing', 'hello' ] }, test: [ 'nope.db' ], testing: [ { name: 'nope.db', version: 'beta' } ], nopeion: { testing: [ [Object] ] } }
```

</div>

<hr>

<div id="clear">

<hr>

- [.clear()](#clear) Örnekleri / Examples:
> [.clear()](#clear) metodunda, database'deki tüm veriyi siler ve dosyayı sıfırlar.

> In the [.clear()](#clear) method, deletes all data in the database and resets the file.

```js
/*
Database'deki veri / Data in the database:

{
  "test": {
    "testing": "nope.db"
  }
}
*/

db.clear() // -> true

/*
Database'deki veri / Data in the database:

{}
*/
```

</div>

<hr>

<div id="backup">

<hr>

- [.backup()](#backup) Örnekleri / Examples:
> [.backup()](#backup) metodunda, database içindeki verileri yeni bir '.json' dosyasına kaydeder.

> In the [.backup()](#backup) method, saves the data in the database to a new '.json' file.

```js
db.backup('./nopeion.json') // -> true
```

</div>

<hr>

<div id="loadBackup">

<hr>

- [.loadBackup()](#loadBackup) Örnekleri / Examples:
> [.loadBackup()](#loadBackup) metodunda, yedeklenen json dosyasının içindeki verileri veritabanı dosyasına kaydeder.

> In the [.loadBackup()](#loadBackup) method, saves the data inside the backed-up json file to the database file.

```js
db.loadBackup('./nopeion.json') // -> true
```

</div>

<hr>
</div>
