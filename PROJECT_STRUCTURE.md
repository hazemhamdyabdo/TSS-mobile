# Mojtama — Project Structure & Patterns

Blueprint for recreating this architecture in a new Expo / React Native project.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Expo SDK 57, React Native 0.86, React 19 |
| Routing | expo-router (file-based, typed routes) |
| Styling | NativeWind 5 + Tailwind CSS v4 (`global.css` `@theme`) |
| Forms | react-hook-form + zod + @hookform/resolvers |
| Bottom sheets | @gorhom/bottom-sheet |
| i18n | i18next + react-i18next + expo-localization |
| Icons | @react-native-vector-icons/material-design-icons |
| Images | expo-image |
| Persistence | @react-native-async-storage/async-storage |
| State | Module stores + subscribe hooks (no Zustand / Redux / React Query) |

**Path aliases** (`tsconfig.json`):

```json
{
  "paths": {
    "@/*": ["./src/*"],
    "@/assets/*": ["./assets/*"]
  }
}
```

**Entry point:** `"main": "expo-router/entry"` in `package.json`.

---

## Top-level folders

```
project-root/
├── app.json                 # Expo config (userInterfaceStyle, plugins, typedRoutes)
├── eas.json                 # EAS Build profiles
├── global.css               # Tailwind v4 design tokens (@theme)
├── metro.config.js          # withNativewind(config)
├── postcss.config.mjs       # @tailwindcss/postcss
├── nativewind-env.d.ts      # Generated NativeWind types
├── tsconfig.json
├── package.json
├── assets/
│   ├── expo.icon/           # App icon
│   └── images/              # Static images by domain (auth/, home/, …)
├── scripts/                 # One-off codemods / migrations
└── src/                     # All application code
    ├── app/                 # Routes only (thin wrappers)
    ├── components/          # Shared UI
    ├── features/            # Domain modules
    ├── hooks/               # App-wide hooks
    ├── localization/        # i18n
    ├── theme/               # JS color mirror of CSS tokens
    └── utils/               # Cross-cutting helpers
```

---

## `src/app/` — Routing (expo-router)

Routes are **thin**. They import feature screen components and handle navigation params — not business UI.

### Route groups

| Path | Purpose |
|------|---------|
| `src/app/index.tsx` | Auth gate → `/(tabs)` or `/(auth)/onboarding` |
| `src/app/_layout.tsx` | Root Stack, providers, startup tasks |
| `src/app/(tabs)/` | Bottom tabs: home, service, more |
| `src/app/(auth)/` | Onboarding, login, OTP, password reset |
| `src/app/*.tsx` | Stack screens (payments, visitors, help, …) |
| `src/app/*/[id].tsx` | Dynamic detail routes |
| `src/app/+not-found.tsx` | 404 |

### Thin route example

```tsx
// src/app/requests.tsx
import RequestsScreen from "@/features/requests/components/RequestsScreen";

export default function RequestsRoute() {
  return <RequestsScreen />;
}
```

### Route with API + navigation

```tsx
// src/app/create-announcement.tsx
import CreateAnnouncementForm from "@/features/home/components/CreateAnnouncementForm";
import CreatePostScreenLayout from "@/features/home/components/CreatePostScreenLayout";
import { createAnnouncementPost } from "@/features/home/api";
import { useRouter } from "expo-router";

export default function CreateAnnouncementScreen() {
  const router = useRouter();

  const handleSubmit = async (values: AnnouncementFormValues) => {
    await createAnnouncementPost(values);
    router.back();
  };

  return (
    <CreatePostScreenLayout>
      <CreateAnnouncementForm onSubmit={handleSubmit} />
    </CreatePostScreenLayout>
  );
}
```

### Dynamic route with role branching

```tsx
// src/app/request/[id]/index.tsx
export default function RequestDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { role, isLoading } = useUserRole();
  const requests = useRequestsState();
  const request = requests.find((r) => r.id === id);

  if (isLoading) return <LoadingState />;
  if (!request) return <NotFoundState />;

  if (role === "admin") {
    return <ManagerRequestDetailsScreen request={request} />;
  }
  return <ResidentRequestDetailsScreen request={request} />;
}
```

### Root layout providers

```tsx
// src/app/_layout.tsx
import "../../global.css";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Startup: initializeI18n(), (optional) initializeTheme(), session restore
// Stack with headerShown: false on all screens
```

---

## `src/features/` — Feature modules

One folder per domain. **16 features** in Mojtama:

`auth` · `chat` · `documents` · `help` · `home` · `meetings` · `notifications` · `payments` · `privacy` · `profile` · `requests` · `residents` · `service` · `settings` · `visitors`

### Full feature template (data-driven)

Use **`requests`** as the reference implementation:

```
src/features/<domain>/
├── api.ts                         # Async boundary (mock or real API)
├── types.ts                       # Domain types & unions
├── store/<domain>State.ts         # In-memory state + subscribe
├── hooks/use<Domain>State.ts      # React hook for store
├── constants/
│   ├── dummy.ts                   # Seed / fixture data
│   └── *.ts                       # Enums, static options
├── schemas/<action>Schema.ts      # Zod schemas + inferred form types
├── utils/                         # Pure helpers (buildX, mapX, …)
├── storage/                       # AsyncStorage (optional, e.g. auth)
└── components/
    ├── <Domain>Screen.tsx         # Top-level screen(s)
    ├── <Domain>Header.tsx
    ├── <Domain>Card.tsx
    ├── *BottomSheet.tsx           # Modals / pickers
    ├── *Form.tsx                  # react-hook-form forms
    ├── *Badge.tsx                 # Status / type chips
    ├── manager/                   # Role-specific UI (optional)
    ├── resident/
    └── shared/                    # Internal shared pieces
```

### Minimal feature (UI-only)

Some features have no API/store (`help`, `privacy`, `chat`):

```
src/features/help/
├── types.ts
├── constants/dummy.ts
└── components/
    ├── HelpScreen.tsx
    └── HelpFaqQuestionCard.tsx
```

### What goes where

| Concern | Location | Never in |
|---------|----------|----------|
| Screen layout & lists | `features/*/components/*Screen.tsx` | `src/app/` |
| HTTP / mock calls | `features/*/api.ts` | Components directly |
| Mutable session data | `features/*/store/*State.ts` | Component `useState` for shared lists |
| Validation rules | `features/*/schemas/` | Inline in components |
| Seed data | `features/*/constants/dummy.ts` | Hardcoded in screens |
| Route URL | `src/app/` | Feature folder |

---

## State pattern

**No global state library.** Each data feature uses a module store:

### Store (`store/requestState.ts`)

```tsx
let requestsState: ServiceRequest[] = [...DUMMY_REQUESTS];
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function getRequestsState() {
  return requestsState;
}

export function addRequestToState(request: ServiceRequest) {
  requestsState = [request, ...requestsState];
  notifyListeners();
}

export function subscribeToRequests(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function resetRequestsState() {
  requestsState = [...DUMMY_REQUESTS];
  notifyListeners();
}
```

### Hook (`hooks/useRequestsState.ts`)

```tsx
export function useRequestsState() {
  const [requests, setRequests] = useState(getRequestsState());

  useEffect(() => {
    return subscribeToRequests(() => setRequests(getRequestsState()));
  }, []);

  return requests;
}
```

### Store naming conventions

| Function | Purpose |
|----------|---------|
| `getXState()` | Read current snapshot |
| `getXFromState(id)` | Read single item |
| `addXToState` / `updateXInState` / `deleteXFromState` | Mutations |
| `subscribeToX(listener)` | Subscribe; returns unsubscribe |
| `resetXState()` | Re-seed from dummy (logout / tests) |

### Global reset on logout

`src/utils/resetMockStores.ts` calls every feature's `resetXState()` + `resetMockIdCounter()`.

---

## Mock API pattern

`Screen → features/<domain>/api.ts → store`

### Utilities (`src/utils/mockApi.ts`)

- `mockDelay()` — 300–600 ms simulated latency
- `MockApiError` — throwable with HTTP-like status
- `createMockId("request")` — unique IDs
- `mockApiCall(fn, options)` — generic wrapper

### API layer (`features/*/api.ts`)

```tsx
export async function getRequests(): Promise<ServiceRequest[]> {
  await mockDelay();
  return getRequestsState();
}

export async function createRequest(request: ServiceRequest) {
  await mockDelay();
  addRequestToState(request);
  return request;
}
```

### UI consumption

| Need | Use |
|------|-----|
| Live list updates | `useXState()` hook |
| Initial fetch + skeleton | `useMockListFetch(getX)` from `src/hooks/useMockListFetch.ts` |
| Mutations | Call `api.ts` functions from handlers |
| Detail by ID on route | Hook + `find`, or `getXById()` in `useEffect` |

```tsx
const requests = useRequestsState();
const isLoading = useMockListFetch(getRequests);

return isLoading ? <ListSkeleton /> : <RequestList data={requests} />;
```

When swapping to a real backend later: keep `api.ts` signatures; replace store calls with fetch.

---

## Component patterns

### Screen shell

Every full screen uses `ScreenSafeAreaView`:

```tsx
import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";

<ScreenSafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
  {/* content */}
</ScreenSafeAreaView>
```

`src/components/ScreenSafeAreaView.tsx` wraps `react-native-safe-area-context` with NativeWind `styled()`.

### Screen naming

| Type | Pattern | Example |
|------|---------|---------|
| Feature screen | `*Screen.tsx` | `PaymentsScreen.tsx` |
| Role variant | `manager/*Screen.tsx` | `ManagerRequestsScreen.tsx` |
| Route file | kebab-case in `app/` | `update-email-verify.tsx` |
| Route component | `*Route` or descriptive | `RequestsRoute` |

### Bottom sheets

Pattern used ~30+ times:

1. `forwardRef` + `useImperativeHandle` exposing `{ open, close }`
2. Internal `useRef<BottomSheetModal>(null)`
3. `BottomSheetBackdrop` with `pressBehavior="close"`
4. `BottomSheetModalProvider` in root `_layout.tsx`
5. Parent: `useRef<XBottomSheetRef>(null)` → `.current?.open()`

```tsx
export type CancelRequestBottomSheetRef = {
  open: () => void;
  close: () => void;
};

const CancelRequestBottomSheet = forwardRef<
  CancelRequestBottomSheetRef,
  Props
>(function CancelRequestBottomSheet({ onConfirmCancel }, ref) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetRef.current?.present(),
    close: () => bottomSheetRef.current?.dismiss(),
  }));

  return (
    <BottomSheetModal ref={bottomSheetRef} backdropComponent={renderBackdrop}>
      <BottomSheetView>{/* content */}</BottomSheetView>
    </BottomSheetModal>
  );
});
```

Naming: `*BottomSheet.tsx`, `*PickerBottomSheet.tsx`.

### Forms

Stack: **react-hook-form** + **zod** + shared helpers.

```
src/components/ui/
├── FormLabel.tsx      # Label + required asterisk (text-label)
└── FieldError.tsx     # Validation message (text-rejected)
```

```tsx
const { control, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(createRequestSchema),
  defaultValues: EMPTY_VALUES,
});

<Controller
  control={control}
  name="title"
  render={({ field: { onChange, value } }) => (
    <TextInput value={value} onChangeText={onChange} className="..." />
  )}
/>
{errors.title ? <FieldError message={errors.title.message} /> : null}
```

Pickers open bottom sheets via refs; selected values go through `setValue`.

Feature layouts: `AuthScreenLayout`, `CreatePostScreenLayout`, `SettingsUpdateScreenLayout`.

### Lists & loading

```
src/components/skeleton/
├── SkeletonBlock.tsx
├── ListCardSkeleton.tsx
└── ListSkeleton.tsx     # Default: 2 cards
```

Use with `useMockListFetch(apiFn)` on list screens.

### Shared UI

```
src/components/
├── AppLoadingScreen.tsx
├── ScreenSafeAreaView.tsx
├── skeleton/
└── ui/
    ├── FormLabel.tsx
    ├── FieldError.tsx
    ├── CategoryTypeChip.tsx
    ├── BottomSheetMenuActionRow.tsx
    └── BottomSheetIconActionRow.tsx
```

### Badges & chips

Small presentational components: `RequestStatusBadge`, `RequestPriorityBadge`, `PaymentFilterChips`, `DocumentCategoryChips`.

---

## Theming

Two layers — keep them in sync.

### 1. CSS tokens (`global.css`)

Tailwind v4 `@theme` block defines semantic colors:

```css
@theme {
  --color-heading: #1f1f1f;
  --color-label: #2e2e2e;
  --color-sec-text: #90a1b9;
  --color-primary: #7b61ff;
  --color-primary-50: #f2f0ff;
  --color-card-border: #e2e8f0;
  --color-pending: #fbbf24;
  --color-approved: #34d399;
  --color-rejected: #f87171;
  /* + full scales for primary, slate, pending, approved, rejected */
}
```

Use as NativeWind classes:

```
text-heading   text-label   text-sec-text   text-primary
bg-primary     bg-primary-50   bg-white   bg-slate-50
border-card-border
text-pending-700   bg-approved-50   text-rejected
```

Import `global.css` in `src/app/_layout.tsx`.

### 2. JS mirror (`src/theme/colors.ts`)

For props that can't use `className` (icons, `ActivityIndicator`, `placeholderTextColor`, tab bar `style`):

```tsx
import { colors } from "@/theme/colors";

<MaterialDesignIcons name="home" color={colors.primary} size={24} />
<TextInput placeholderTextColor={colors.secText} />
```

**Rule:** Prefer Tailwind classes in `className`. Use `colors.*` only when NativeWind can't style the prop.

### NativeWind setup

- `metro.config.js` → `withNativewind(config)`
- `postcss.config.mjs` → `@tailwindcss/postcss`
- `styled()` from `nativewind` for wrappers (e.g. SafeAreaView)

---

## Localization (i18n)

### Structure

```
src/localization/
├── i18n.ts                    # Init, changeLanguage, RTL reload
├── translateLabel.ts            # Enum label helper
└── locales/
    ├── en.json                  # Auth + common base strings
    ├── ar.json
    └── features/
        ├── en.ts                # Feature namespaces (tabs, home, requests, …)
        └── ar.ts
```

### Usage

```tsx
const { t } = useTranslation();

t("tabs.home")
t("requests.create.title")
t("auth.continueAs", { role: label })
```

Enum labels:

```tsx
translateLabel(t, "requests.priorities", priorityId)
translateOptions(t, "home.filters", filters)
```

### RTL (Arabic)

- `I18nManager.forceRTL(true)` when language is `ar`
- App reload required for layout flip (`DevSettings.reload` / `Updates.reloadAsync`)
- Guard key in AsyncStorage prevents reload loops

Initialized in `_layout.tsx` startup before routes render.

---

## Naming conventions

| Category | Convention | Example |
|----------|------------|---------|
| Routes | kebab-case files | `create-meeting.tsx`, `update-phone-verify.tsx` |
| Screens | `*Screen.tsx` | `VisitorsScreen.tsx` |
| Role folders | `manager/`, `resident/` | `ManagerRequestCard.tsx` |
| Bottom sheets | `*BottomSheet.tsx` | `BankPickerBottomSheet.tsx` |
| Sheet refs | `*BottomSheetRef` | `{ open; close }` |
| Forms | `*Form.tsx` | `LoginForm.tsx` |
| Schemas | `*Schema.ts` | `createRequestSchema` → `CreateRequestFormValues` |
| Stores | `*State.ts` in `store/` | `visitorState.ts` |
| Hooks | `use*State`, `useUserRole` | `usePaymentsState` |
| API | verb + noun | `getVisitors`, `deleteDocument` |
| Types | `types.ts`, PascalCase | `ServiceRequest`, `PaymentBill` |
| Seed data | `constants/dummy.ts` | `DUMMY_REQUESTS` |
| Imports | `@/` alias always | `@/features/home/api` |
| i18n keys | dot-separated | `payments.empty.historyTitle` |
| Mock IDs | `createMockId("visitor")` | `visitor-1730…-1` |
| Switches | exhaustive `never` default | Required for union types |

---

## Data flow (end-to-end)

```
┌─────────────────────────────────────────────────────────┐
│  src/app/*.tsx          Thin route (params, navigate)   │
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│  features/*/components/*Screen.tsx                      │
│    · useXState() for live data                          │
│    · useMockListFetch(getX) for skeleton                │
│    · handlers call api.ts                               │
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│  features/*/api.ts                                      │
│    · await mockDelay()                                  │
│    · read/write store                                   │
│    · throw MockApiError on failure                      │
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│  features/*/store/*State.ts                             │
│    · mutate in-memory array/object                      │
│    · notifyListeners()                                  │
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│  hooks/useXState.ts → components re-render              │
└─────────────────────────────────────────────────────────┘
```

---

## Adding a new feature (checklist)

1. **Create folder** `src/features/my-feature/` with `types.ts`, `constants/dummy.ts`.
2. **Add store** (if mutable data): `store/myFeatureState.ts` + `hooks/useMyFeatureState.ts`.
3. **Add API** `api.ts` using `mockDelay` and store mutators.
4. **Build UI** in `components/MyFeatureScreen.tsx` (+ cards, sheets, forms as needed).
5. **Add route** `src/app/my-feature.tsx` (thin wrapper).
6. **Register screen** in `src/app/_layout.tsx` `<Stack.Screen>`.
7. **Add i18n** keys in `locales/features/en.ts` and `ar.ts`.
8. **Wire reset** in `src/utils/resetMockStores.ts` (if store exists).
9. **Add tokens** to `global.css` / `colors.ts` only if new semantic colors are needed.

---

## New project bootstrap

1. `npx create-expo-app@latest` with Expo 57 + expo-router template (or match Mojtama `package.json`).
2. Install: `nativewind`, `tailwindcss`, `@tailwindcss/postcss`, `react-native-css`, `@gorhom/bottom-sheet`, `react-hook-form`, `zod`, `@hookform/resolvers`, `i18next`, `react-i18next`, `expo-localization`.
3. Configure Metro (`withNativewind`), PostCSS, `global.css`, path alias `@/*`.
4. Create folder skeleton: `src/app`, `src/features`, `src/components`, `src/theme`, `src/localization`, `src/utils`, `src/hooks`.
5. Copy patterns from this doc — start with one full feature (`requests` structure).
6. Set `app.json`: `"userInterfaceStyle": "automatic"`, `expo-router` plugin, `typedRoutes`.

---

## Key files to copy / read first

| File | Why |
|------|-----|
| `src/app/_layout.tsx` | Providers, Stack registry, startup |
| `src/app/index.tsx` | Auth gate / initial redirect |
| `src/app/(tabs)/index.tsx` | Complex screen: store + API + sheets |
| `src/features/requests/` | Complete feature module reference |
| `src/utils/mockApi.ts` | Mock infrastructure |
| `src/utils/resetMockStores.ts` | Logout reset |
| `global.css` + `src/theme/colors.ts` | Design tokens |
| `src/localization/i18n.ts` | Bilingual + RTL |
| `src/components/ScreenSafeAreaView.tsx` | Screen wrapper pattern |

---

## Principles (do / don't)

**Do**

- Keep routes thin; put UI in features.
- One `api.ts` per feature as the network boundary.
- Use semantic Tailwind tokens (`text-heading`, `bg-primary`) not raw hex.
- Colocate role variants (`manager/`, `resident/`).
- Use Zod schemas for all form validation.
- Subscribe hooks for any shared mutable list.

**Don't**

- Add Zustand, Redux, React Query, or MSW unless you intentionally change architecture.
- Put business logic or large JSX in `src/app/`.
- Hardcode user-visible strings (use i18n).
- Import `constants/dummy.ts` in screens for display (read from store via hook).
- Skip `resetXState` when adding a new store (logout will leak state).

---

*Generated from the Mojtama codebase. Expo docs: https://docs.expo.dev/versions/v57.0.0/*
