# SOHO Agent

Русский · [Қазақша](README.kk.md) · [English](README.en.md)

## Установка

Нужен установленный Codex или Claude Code с поддержкой плагинов.

**Codex:** добавьте marketplace в терминале:

```sh
codex plugin marketplace add https://github.com/procraft/soho-agent-marketplace.git
```

В приложении Codex откройте каталог плагинов, найдите marketplace `soho-agent` и установите плагин `soho-agent`. Затем начните новую сессию.

**Claude Code:** выполните в терминале:

```sh
claude plugin marketplace add https://github.com/procraft/soho-agent-marketplace.git
claude plugin install soho-agent@soho-agent
```

Начните новую сессию Claude Code или выполните `/reload-plugins`.

## Что доступно сейчас

Проект в разработке (WIP). Установка добавляет skills для анализа PDF и конфигурацию MCP `https://api.soholms.com/mcp`. Загрузка файлов, импорт и применение изменений в LMS пока недоступны.

После установки в Codex откройте настройки подключения SOHO в установленном плагине и выберите вход. В Claude Code выполните `/mcp`, выберите `plugin:soho-agent:soho` и авторизуйтесь. Браузер откроет SOHO: войдите и подтвердите доступ к нужной школе. Не добавляйте второй MCP-сервер вручную для проверки плагина.

Пакет содержит отдельные заранее зарегистрированные OAuth client ID для Codex и Claude Code. **Живой вход ещё не проверен:** оператор SOHO должен развернуть совместимый сервис и включить Agent Access для вашей школы. При ошибке подключения сохраните её текст без токенов и обратитесь к оператору. Cursor пока не поддерживается.

GitHub используется для получения пакета. Вход в SOHO и разрешение доступа к школе — отдельный OAuth-процесс в браузере. GitHub-аккаунт не даёт доступа к SOHO. Не передавайте агенту пароли, cookies или токены.

## Обновление

```sh
codex plugin marketplace upgrade soho-agent
```

После обновления marketplace обновите установленный плагин в интерфейсе Codex и начните новую сессию.

```sh
claude plugin marketplace update soho-agent
claude plugin update soho-agent@soho-agent
```

Перезапустите Claude Code. Если marketplace нужно добавить заново, используйте `https://github.com/procraft/soho-agent-marketplace.git`.

Изменения: [CHANGELOG](plugins/soho-agent/CHANGELOG.md). Версии пакета и сервиса обновляются отдельно; фоновое самообновление не реализовано.

Сведения для сопровождающих и ссылки на документацию клиентов: [English](README.en.md#maintenance).
