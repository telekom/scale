<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Telekom Brand Header & Navigation</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

Der Brand Header vermittelt Absender und Angebot einer Webseite auf einen Blick. Er macht Telekom Webseiten für Nutzer\*innen wiedererkennbar und bietet ein einheitliches Erlebnis für alle unsere Produkte und Services.

## Allgemein

Der Brand Header ist die zentrale Komponente für den Einstieg in die Markenwelt der Deutschen Telekom. Das Logo auf magentafarbenem Grund kennzeichnet unsere Marke eindeutig. Beim Scrollen der Seite auf Desktop-Geräten verkleinert sich der Header und gibt Raum für den Content der Seite.

## Basistypen

<br/>

### Standard

Der Brand Header Standard enthält alle verfügbaren Elemente und Telekom Links.
Im gescrollten Zustand sind die Meta-Navigation und das Sprachwechsel-Element ausgeblendet.

![Image Name](assets/3_components/beta-brand-header/1_DE_brandheader_brandbar_standard.png)

### Brand Header Slim

Der Brand Header Slim enthält weder Meta-Navigation noch Sprachwechsel. Beim Scrollen reduziert sich lediglich die Höhe der Komponente.

![Image Name](assets/3_components/beta-brand-header/2_DE_brandheader_brandbar_slim.png)

### Brand Header Subtle

Der Brand Header Subtle hat keine Hauptnavigation oder Funktionen und ist am oberen Bildschirmrand fixiert. Er hebt sich nicht durch einen Schatten vom Inhalt der Seite ab oder verändert sich beim Scrollen.

![Image Name](assets/3_components/beta-brand-header/3_brandheader_brandbar_subtle.png)

## Elemente

![Image Name](assets/3_components/brand-header/4_brandheader_brandbar_elements.jpg)

#### Brand Area mit Logo (1) (verpflichtend)

Das Logo und der magentafarbene Hintergrund sind für jede Seite der Telekom verbindlich und können nicht verändert werden. Das Logo ist standardmäßig mit der Telekom Homepage verlinkt oder dem Einstiegspunkt in den aktuellen Prozess.

#### Portalname (2) (optional)

Name des Produkts oder Services.

#### Meta-Navigation (3) (optional)

Platziere hier globale Links zu Telekom Inhalten außerhalb der Webseite und ermögliche den Wechsel zwischen Privat- und Geschäftskund\*innen.

#### Meta-Navigation (4) (optional)

Interne Links (zum Beispiel Einstellungen und Kontakt).

#### Sprachwechsel-Element (5) (optional)

Verwende Länderkürzel als Links bei wenigen Sprachen. Ist der Inhalt in mehr als drei Sprachen, nutze ein Dropdown – in dieser Komponente noch nicht verfügbar.

#### Hauptnavigation (6)

Die Hauptnavigation enthält alle Navigationspunkte der ersten Ebene.

#### Funktionen (7)

Hier sind globale Funktionen wie Suche, Warenkorb oder Login aufgeführt. Der Login befindet sich dabei immer rechts. Ergänze die Icons wenn möglich mit einem Label.

#### Nutzerprofilmenü (8)

Bietet die Möglichkeit zur An- und Abmeldung und verwandte Funktionen wie Registrierung oder Links zu Diensten.

## Größen

Für die verschiedenen Breakpoints sind unterschiedliche Größen definiert.

## Navigation

### Mega-Menü

Das Mega-Menü nutzt du am besten für eine flache Informationsarchitektur. Es bietet eine gute Übersicht innerhalb einer Kategorie. Die Ebenentiefe ist allerdings auf drei Ebenen begrenzt.

![Image Name](assets/3_components/beta-brand-header/5_brandheader_nav4_megamenu.png)

### Dropdown-Navigation

<div style="display: flex; width: 100%; border-radius: 3px; background-color: rgb(241, 241, 239); padding: 16px 16px 14px 20px;">
    <div style="padding-top:1px">
        <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="24px"><path fill-rule="evenodd" d="M12 1c6.1 0 11 4.9 11 11s-4.9 11-11 11S1 18.1 1 12 5.9 1 12 1zm0 1.5c-5.25 0-9.5 4.25-9.5 9.5s4.25 9.5 9.5 9.5 9.5-4.25 9.5-9.5-4.25-9.5-9.5-9.5zm1 8V17h-2v-6.5h2zm-1-4A1.25 1.25 0 1112 9a1.25 1.25 0 010-2.5z"></path></svg>
    </div>
    <div style="margin-top: 4px;">
        **Diese Komponente ist bald verfügbar**
    </div>
</div>

![Image Name](assets/3_components/beta-brand-header/brandheader_dropdown_menu.png)

Die Dropdown-Navigation eignet sich für Webseiten mit umfangreicher Seitenarchitektur. Sie kann mehrere Hierarchieebenen innerhalb des Navigationsbaums darstellen. Generell gilt: je weniger Ebenen, desto besser.

### Mobile Navigation

Auf kleinen Viewports gibt es nur eine Art der Navigation.

![Image Name](assets/3_components/beta-brand-header/6_brandheader_nav_mobile.png)

### Nutzerprofilmenü

Mithilfe des Profilmenüs können sich Nutzer\*innen an- und abmelden. Wenn dein Dienst den Telekom Login verwendet, solltest du es in deinen Header einbinden.

#### Abgemeldeter Zustand

Ein kurzer Beschreibungstext erläutert, welche Funktionen nach dem Login zur Verfügung stehen werden. Neben dem Button, der zur Login-Maske führt, gibt es ergänzende Links zu einer Hilfeseite und zum Registrierungsprozess.

![](assets/3_components/brand-header/BrandHeader-LoggedOut.png)

#### Angemeldeter Zustand

Das Icon bekommt einen grünen Badge und der Vorname der angemeldeten Person ist zu lesen. Neben der Option, sich abzumelden, können optional verschiedene Dienste der Telekom angezeigt werden.

![](assets/3_components/brand-header/BrandHeader-LoggedIn.png)

## Beta-Komponente

Diese Komponente befindet sich noch im Beta-Stadium. Wenn du sie testest, bedenke, dass sie möglicherweise noch nicht alle Qualitätskontrollmaßnahmen durchlaufen hat und noch keine WCAG-Zertifizierung zur Barrierefreiheit vorliegt. In Zukunft kann es zu Änderungen an dieser Komponente kommen.

## Verwandte Komponenten

- [Breadcrumb](?path=/usage/components-breadcrumb--standard)
- [Sidebar Navigation](?path=/usage/components-sidebar-navigation--standard)
- [Tab Navigation](?path=/usage/components-tab-navigation--text-icon)
- [Accordion](?path=/usage/components-accordion--standard)
- [Profile Menu](?path=/docs/components-telekom-brand-header-navigation--profile-menu-logged-out)
