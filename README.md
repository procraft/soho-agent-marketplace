# SOHO Agent

Русский · [Қазақша](README.kk.md) · [English](README.en.md)

## Установка в Codex Desktop — без терминала

1. Откройте **Plugins → Personal → Add → Add a marketplace**.
2. В окне **Add plugin marketplace** заполните:
   - **Source:** `https://github.com/procraft/soho-agent-marketplace.git`
   - **Git ref:** `master`
   - **Sparse paths:** оставьте пустым.
3. Нажмите **Add marketplace**. Выберите marketplace **SOHO Agent** и установите плагин **soho-agent**.
4. Завершите предложенный вход в SOHO и начните новый чат.

Терминал, скачивание ZIP и ручная настройка MCP не нужны. Эти поля подтверждены в текущем интерфейсе Desktop; установка пакета и живой вход в SOHO ещё не проверены. Требования для подключения школы описаны ниже.

<details>
<summary>Установка через CLI — для тех, кому удобнее терминал</summary>

Если предпочитаете терминал, зарегистрируйте Git marketplace для Codex:

```sh
codex plugin marketplace add https://github.com/procraft/soho-agent-marketplace.git
```

Затем в приложении выберите **Plugins → SOHO Agent** и установите **soho-agent**. Начните новую сессию.

Для **Claude Code** с поддержкой плагинов:

```sh
claude plugin marketplace add https://github.com/procraft/soho-agent-marketplace.git
claude plugin install soho-agent@soho-agent
```

Начните новую сессию Claude Code или выполните `/reload-plugins`. Эти настройки предназначены для Claude Code; работа в обычном чате Claude Desktop не подтверждена.

</details>

## Что доступно сейчас

Проект в разработке (WIP). Установка добавляет skills для анализа PDF и конфигурацию MCP `https://api.soholms.com/mcp`. Загрузка файлов, импорт и применение изменений в LMS пока недоступны.

После установки в Codex откройте настройки подключения SOHO в установленном плагине и выберите вход. В Claude Code выполните `/mcp`, выберите `plugin:soho-agent:soho` и авторизуйтесь. Браузер откроет SOHO: войдите и подтвердите доступ к нужной школе. Не добавляйте второй MCP-сервер вручную для проверки плагина.

Пакет содержит отдельные заранее зарегистрированные OAuth client ID для Codex и Claude Code. **Живой вход ещё не проверен:** оператор SOHO должен развернуть совместимый сервис и включить Agent Access для вашей школы. При ошибке подключения сохраните её текст без токенов и обратитесь к оператору. Cursor пока не поддерживается.

GitHub используется для получения пакета. Вход в SOHO и разрешение доступа к школе — отдельный OAuth-процесс в браузере. GitHub-аккаунт не даёт доступа к SOHO. Не передавайте агенту пароли, cookies или токены.

## Обновление

**В Codex Desktop:** обновите marketplace **SOHO Agent** в каталоге Plugins, затем обновите установленный плагин и начните новый чат. При повторном добавлении используйте Source `https://github.com/procraft/soho-agent-marketplace.git`, Git ref `master`, Sparse paths оставьте пустым.

<details>
<summary>Обновление через CLI</summary>

```sh
codex plugin marketplace upgrade soho-agent
```

После обновления marketplace обновите установленный плагин в интерфейсе Codex и начните новую сессию.

```sh
claude plugin marketplace update soho-agent
claude plugin update soho-agent@soho-agent
```

Перезапустите Claude Code. Если marketplace нужно добавить заново, используйте `https://github.com/procraft/soho-agent-marketplace.git`.

</details>

Изменения: [CHANGELOG](plugins/soho-agent/CHANGELOG.md). Версии пакета и сервиса обновляются отдельно; фоновое самообновление не реализовано.

Сведения для сопровождающих и ссылки на документацию клиентов: [English](README.en.md#maintenance).
