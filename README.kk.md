# SOHO Agent

[Русский](README.md) · Қазақша · [English](README.en.md)

## Орнату

Плагиндерді қолдайтын Codex немесе Claude Code орнатылған болуы керек.

**Codex:** терминалда marketplace қосыңыз:

```sh
codex plugin marketplace add https://github.com/procraft/soho-agent-marketplace.git
```

Codex қолданбасында плагиндер каталогын ашып, `soho-agent` marketplace ішінен `soho-agent` плагинін орнатыңыз. Содан кейін жаңа сессия бастаңыз.

**Claude Code:** терминалда орындаңыз:

```sh
claude plugin marketplace add https://github.com/procraft/soho-agent-marketplace.git
claude plugin install soho-agent@soho-agent
```

Claude Code бағдарламасында жаңа сессия бастаңыз немесе `/reload-plugins` пәрменін орындаңыз.

## Қазір не қолжетімді

Жоба әзірленіп жатыр (WIP). Орнату PDF талдауға арналған skills пен `https://api.soholms.com/mcp` MCP конфигурациясын қосады. Файл жүктеу, импорттау және LMS деректерін өзгерту әзірге қолжетімсіз.

Орнатқаннан кейін Codex ішінде орнатылған плагиннің SOHO қосылымын ашып, кіруді таңдаңыз. Claude Code ішінде `/mcp` пәрменін орындап, `plugin:soho-agent:soho` серверін таңдап, авторизациядан өтіңіз. Браузерде SOHO ашылады: жүйеге кіріп, қажетті мектепке қол жеткізуге рұқсат беріңіз. Плагинді тексеру үшін екінші MCP серверін қолмен қоспаңыз.

Пакетте Codex пен Claude Code үшін бөлек алдын ала тіркелген OAuth client ID бар. **Нақты кіру әлі тексерілмеген:** SOHO операторы үйлесімді қызметті іске қосып, мектебіңізге Agent Access мүмкіндігін қосуы керек. Қосылым қатесі болса, токендерсіз қате мәтінін сақтап, операторға хабарласыңыз. Cursor әзірге қолдау көрсетілмейді.

GitHub пакетті алу үшін қолданылады. SOHO жүйесіне кіру және мектепке қол жеткізуге рұқсат беру — браузердегі бөлек OAuth процесі. GitHub аккаунты SOHO деректеріне қол жеткізу құқығын бермейді. Агентке құпиясөз, cookies немесе токендерді бермеңіз.

## Жаңарту

```sh
codex plugin marketplace upgrade soho-agent
```

Marketplace жаңартылғаннан кейін Codex интерфейсінде орнатылған плагинді жаңартып, жаңа сессия бастаңыз.

```sh
claude plugin marketplace update soho-agent
claude plugin update soho-agent@soho-agent
```

Claude Code бағдарламасын қайта іске қосыңыз. Marketplace қайта қосу қажет болса, `https://github.com/procraft/soho-agent-marketplace.git` URL қолданыңыз.

Өзгерістер: [CHANGELOG](plugins/soho-agent/CHANGELOG.md). Пакет пен қызмет бөлек жаңартылады; фондық автоматты жаңарту іске асырылмаған.

Сүйемелдеушілерге арналған мәліметтер және клиент құжаттамасы: [English](README.en.md#maintenance).
