# SOHO Agent

[Русский](README.md) · Қазақша · [English](README.en.md)

## Codex Desktop ішінде орнату — терминалсыз

1. **Plugins → Personal → Add → Add a marketplace** ашыңыз.
2. **Add plugin marketplace** терезесінде толтырыңыз:
   - **Source:** `https://github.com/procraft/soho-agent-marketplace.git`
   - **Git ref:** `master`
   - **Sparse paths:** бос қалдырыңыз.
3. **Add marketplace** басыңыз. **SOHO Agent** marketplace таңдап, **soho-agent** плагинін орнатыңыз.
4. Ұсынылған SOHO кіруін аяқтап, жаңа чат бастаңыз.

Терминал, ZIP жүктеу немесе MCP қолмен баптау қажет емес. Бұл өрістер қазіргі Desktop интерфейсінде расталған; пакетті орнату және SOHO жүйесіне нақты кіру әлі тексерілмеген. Мектепке қосылу талаптары төменде сипатталған.

## Claude Desktop ішінде орнату — терминалсыз

### Chat және Cowork

1. Claude Desktop ішінде **Customize → Plugins** ашыңыз. Cowork үшін алдымен **Cowork** қойындысын таңдаңыз. Кейбір нұсқаларда каталог **Settings → Plugins** ішінде орналасқан.
2. **Add → Add marketplace → Add from a repository** таңдаңыз.
3. `https://github.com/procraft/soho-agent-marketplace` енгізіңіз — **`.git` қоспаңыз**. Интерфейсте **Sync** көрсетілсе, оны басыңыз.
4. **soho-agent** плагинін тауып, **Add** немесе **Install** арқылы орнатыңыз. Жаңа чат немесе Cowork тапсырмасын бастаңыз. Плагиндер Claude ақылы жоспарларында қолжетімді.

Бұл тәсіл PDF талдау skills қосады. **Chat/Cowork ішінде SOHO қосылымы пакеттің қазіргі OAuth баптауларымен әзірге қолдау көрсетілмейді:** олар жергілікті Claude Code үшін арналған. Desktop ішінде орнату мектеп деректеріне қол жеткізу құқығын өздігінен бермейді.

### Code — жергілікті сессия

SOHO жүйесіне қосылу үшін **Code** қойындысында жергілікті сессияны қолданыңыз. Claude аккаунты арқылы орнатылған плагиндер Claude Code 2.1.273 немесе жаңа нұсқасы іске қосылғанда синхрондалады; сол аккаунтқа кіріп, жаңа Code сессиясын бастаңыз.

Хабарлама өрісінің жанындағы **+ → Plugins → Add plugin** ашып, **soho-agent** таңдаңыз және әлі орнатылмаған болса, өз аккаунтыңыз үшін орнатыңыз. Marketplace көрінбесе, Code хабарлама өрісінде `/plugin marketplace add https://github.com/procraft/soho-agent-marketplace.git` орындап, каталогты қайта ашыңыз. Бұл Desktop ішіндегі пәрмен, сыртқы терминал қажет емес.

Кіру үшін Code сессиясында `/mcp` орындап, кірістірілген `plugin:soho-agent:soho` серверін таңдаңыз да, браузерде кіруді аяқтаңыз. Қазіргі пакетте осы жергілікті режимнің баптаулары бар; нақты кіру әлі тексерілмеген және мектеп үшін Agent Access қосылуы қажет. Бұл тәсіл Code бұлттық сессиясына арналмаған.

<details>
<summary>CLI арқылы орнату — терминалды қалайтындар үшін</summary>

Терминалды қаласаңыз, Codex үшін Git marketplace тіркеңіз:

```sh
codex plugin marketplace add https://github.com/procraft/soho-agent-marketplace.git
```

Содан кейін қолданбада **Plugins → SOHO Agent** арқылы **soho-agent** плагинін орнатып, жаңа сессия бастаңыз.

Плагиндерді қолдайтын **Claude Code** үшін:

```sh
claude plugin marketplace add https://github.com/procraft/soho-agent-marketplace.git
claude plugin install soho-agent@soho-agent
```

Жаңа Claude Code сессиясын бастаңыз немесе `/reload-plugins` орындаңыз. Бұл баптаулар Claude Code үшін арналған; кәдімгі Claude Desktop чатында жұмыс істеуі расталмаған.

</details>

## Қолдау қызметкерінің қолжетімділігі

Қолдау үшін алдымен қолданыстағы **Admin Intrude** ішінде мектеп пен қызметкерді таңдаңыз. Одан кейін Codex немесе жергілікті Claude Code ішіндегі орнатылған SOHO Agent байланысын қайта қосып, SOHO бетінде мектепті, қызметкерді және әкімшіні растаңыз. Жұмыс алдында агент `soho_context` оқып, осы деректерді көрсетеді; мектеп ауысқанда нақты таңдау қажет, жаңа чат ұсынылады.

Қолжетімділік ең көбі 30 күн және бастапқы Intrude сессиясының мерзімінен аспайды. Бір немесе барлық өз байланыстарыңызды Admin → `/settings/agent-connections` немесе [Master → Агент байланыстары](https://master.soholms.com/profile/agent-connections) арқылы ажыратыңыз. Браузерден шығу MCP-ді өздігінен ажыратпайды. Бұл сценарий Chat/Cowork үшін SOHO OAuth қоспайды; орналастыру мен нақты қосылымды тексеру бөлек қадамдар болып қалады.

## Қазір не қолжетімді

Жоба әзірленіп жатыр (WIP). Орнату PDF талдауға арналған skills пен `https://api.soholms.com/mcp` MCP конфигурациясын қосады. Файл жүктеу, импорттау және LMS деректерін өзгерту әзірге қолжетімсіз.

Орнатқаннан кейін Codex ішінде орнатылған плагиннің SOHO қосылымын ашып, кіруді таңдаңыз. Claude Code ішінде `/mcp` пәрменін орындап, `plugin:soho-agent:soho` серверін таңдап, авторизациядан өтіңіз. Браузерде SOHO ашылады: жүйеге кіріп, қажетті мектепке қол жеткізуге рұқсат беріңіз. Плагинді тексеру үшін екінші MCP серверін қолмен қоспаңыз.

Пакетте Codex пен Claude Code үшін бөлек алдын ала тіркелген OAuth client ID бар. **Нақты кіру әлі тексерілмеген:** SOHO операторы үйлесімді қызметті іске қосып, мектебіңізге Agent Access мүмкіндігін қосуы керек. Қосылым қатесі болса, токендерсіз қате мәтінін сақтап, операторға хабарласыңыз. Cursor әзірге қолдау көрсетілмейді.

GitHub пакетті алу үшін қолданылады. SOHO жүйесіне кіру және мектепке қол жеткізуге рұқсат беру — браузердегі бөлек OAuth процесі. GitHub аккаунты SOHO деректеріне қол жеткізу құқығын бермейді. Агентке құпиясөз, cookies немесе токендерді бермеңіз.

## Жаңарту

**Codex Desktop ішінде:** Plugins каталогында **SOHO Agent** marketplace жаңартып, орнатылған плагинді жаңартыңыз да, жаңа чат бастаңыз. Қайта қосқанда Source `https://github.com/procraft/soho-agent-marketplace.git`, Git ref `master` қолданыңыз, Sparse paths бос қалсын.

<details>
<summary>CLI арқылы жаңарту</summary>

```sh
codex plugin marketplace upgrade soho-agent
```

Marketplace жаңартылғаннан кейін Codex интерфейсінде орнатылған плагинді жаңартып, жаңа сессия бастаңыз.

```sh
claude plugin marketplace update soho-agent
claude plugin update soho-agent@soho-agent
```

Claude Code бағдарламасын қайта іске қосыңыз. Marketplace қайта қосу қажет болса, `https://github.com/procraft/soho-agent-marketplace.git` URL қолданыңыз.

</details>

Өзгерістер: [CHANGELOG](plugins/soho-agent/CHANGELOG.md). Пакет пен қызмет бөлек жаңартылады; фондық автоматты жаңарту іске асырылмаған.

Сүйемелдеушілерге арналған мәліметтер және клиент құжаттамасы: [English](README.en.md#maintenance).
