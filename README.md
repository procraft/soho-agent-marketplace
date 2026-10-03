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

## Установка в Claude Desktop — без терминала

### Chat и Cowork

1. В Claude Desktop откройте **Customize → Plugins**. В Cowork сначала выберите вкладку **Cowork**. В некоторых версиях каталог находится в **Settings → Plugins**.
2. Выберите **Add → Add marketplace → Add from a repository**.
3. Введите `https://github.com/procraft/soho-agent-marketplace` — **без `.git`**. Если интерфейс предлагает **Sync**, нажмите её.
4. Найдите **soho-agent** и установите кнопкой **Add** или **Install**, затем начните новый чат или задачу Cowork. Плагины доступны на платных планах Claude.

Этот сценарий добавляет skills для анализа PDF. **Подключение к SOHO в Chat/Cowork пока не поддержано текущими OAuth-настройками пакета:** они предназначены для локального Claude Code. Установка в Desktop сама по себе не открывает доступ к школе.

### Code — локальная сессия

Для подключения к SOHO используйте вкладку **Code** и локальную сессию. Плагины, установленные через аккаунт Claude, синхронизируются при старте Claude Code версии 2.1.273 или новее; войдите в тот же аккаунт и начните новую сессию Code.

Откройте **+** рядом с полем сообщения → **Plugins → Add plugin**, выберите **soho-agent** и установите для своей учётной записи, если он ещё не установлен. Если marketplace не появился, в поле сообщения Code выполните `/plugin marketplace add https://github.com/procraft/soho-agent-marketplace.git`, затем снова откройте каталог. Это команда внутри Desktop, внешний терминал не нужен.

Для входа выполните `/mcp` внутри сессии Code, выберите встроенный сервер `plugin:soho-agent:soho` и завершите браузерный вход. Текущий пакет содержит настройки для этого локального режима; живой вход ещё не проверен и требует включённого Agent Access для школы. Code в облачной сессии не входит в этот сценарий.

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

## Доступ сотрудника поддержки

Для поддержки сначала выберите школу и сотрудника в существующем **Admin Intrude**, затем переподключите установленный SOHO Agent в Codex или локальном Claude Code и подтвердите школу, сотрудника и администратора на странице SOHO. Перед работой агент читает `soho_context` и показывает эти данные; при смене школы нужен явный выбор, рекомендуется новый чат.

Агент показывает срок подключения как «Доступ подключения до», а исходный срок Intrude — отдельно. Если старый backend не сообщает срок подключения, точная дата не объявляется.

Доступ действует не более 30 дней и не дольше исходной сессии Intrude. Отключить одну или все свои связи можно в Admin → `/settings/agent-connections` или [Master → Подключения агента](https://master.soholms.com/profile/agent-connections). Выход из браузера сам по себе не отключает MCP. Этот сценарий не добавляет SOHO OAuth в Chat/Cowork; развертывание и проверка живого подключения остаются отдельными шагами.

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
