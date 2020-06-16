# DeepaMehta 5 Detail Panel

## Version History

**0.30** -- Mar 30, 2020

* Improvements:
    * Related tab:
        * Show load spinner
    * Meta tab:
        * Add inline edit for "Workspace"
        * "ID" links to JSON view
    * Add `no-pin-button` attr to suppress pin button
    * Supports declarative component instantiation

**0.29** -- Nov 22, 2019

* Improvements:
    * Add `isDirty()` and `save()` component methods
    * Related tab: remember sort mode beyond tab component destroy

**0.28** -- Aug 26, 2019

* Chore:
    * Bump `dm5-object-renderer` dependency

**0.27** -- Aug 16, 2019

* Improvements:
    * Related tab: don't show directly related child topics

**0.26** -- Jul 22, 2019

* Features:
    * New "Pin" button ("Close" button is dropped)
* Chore:
    * Adapt to `dm5` library ("comp def", "children" renamings)
    * Change license to `AGPL-3.0`

**0.25** -- May 28, 2019

* Improvement: pin Edit/Save button to lower end of Detail Panel; it does not scroll away

**0.24** -- Apr 22, 2019

* Chore: lock `dm5-` dependencies (for releasing DMX-5.0-beta.2)

**0.23** -- Apr 1, 2019

* Emit `related-icon-click` event

**0.22** -- Mar 2, 2019

* Features:
    * Populate the `Meta` tab with topic/assoc meta data (timestamps, creator/modifier, workspace assignment, ...)
    * Tabs stay fixed when scrolling
    * Add a Close button

**0.21** -- Jan 29, 2019

* Fix: disable "Edit" button for DMX value topics; add tooltip
* Fix: don't crop Quill editor toolbar
* Change license to `GPL-3.0-or-later`

**0.20** -- Jan 5, 2019

* Adapt to `dm5` library (class `DMXObject`)

**0.19** -- Dec 21, 2018

* Show view config in "View" tab
* Emit `submit-view-config` event

**0.18** -- Nov 24, 2018

* Composability: new component property `types` (component does not access app state)

**0.17** -- Nov 7, 2018

* Enter key submits form

**0.16** -- Oct 21, 2018

* Rename component prop `object-renderers` to `detail-renderers`. It contains both, `object` renderers and `value` renderers.

**0.15** -- Oct 6, 2018

* Info-tab component does not render title. The underlying object renderer has full rendering control.
* New component property `markerIds` allows rendering certain topics as "marked" in the related-tab
* Component supports manual mounting in conjunction with manual data update ("props" are mirrored as "data")

**0.14** -- Jul 31, 2018

* Add GitLab CI/CD

**0.13** -- Apr 10, 2018

* Custom style for Element UI tabs

**0.12** -- Mar 25, 2018

* Improved auto-positioning of new topics
* Improved composability:
    * New `quill-config` property allows parent component to customize the Quill editor in both ways, setting options, and providing extensions (e.g. formats)
    * Emit `submit-inline` event to signalize "inline editing completed" (info-tab)
    * Emit `child-topic-reveal` to signalize "user clicked 'Reveal' button" (info-tab)
    * Emit `related-topic-click` to signalize "user clicked related topic" (related-tab)
* Packaging: `dm5-topic-list` is now a reusable component, a standalone node-module

**0.11** -- Feb 21, 2018

* Improved composability:
    * Component relies on explicit props (instead of context injection).
    * Props have reasonable defaults.
    * Emit events (instead of dispatching into the host app): `tab-click`, `edit`, `submit`.
    * Panel visibility and tab selection can be controlled from outside.
* Internal edit buffer.

**0.10** -- Feb 3, 2018

* Access Control
* Composability: access injected context instead of host app's store

**0.9** -- Jan 13, 2018

* "Info" tab:
    * Multi-value fields
* "Related" tab:
    * Topic list is sorted and grouped
    * Show topic icons
    * Show assocs

**0.8** -- Dec 5, 2017

* Editor for "relating associations"
* Inline editing
* Reveal child topics from info display (1st tab)
* Configure Select widget to allow custom values
* Adapt to Element UI 2.0

**0.7** -- Nov 19, 2017

* Dynamic widget mechanism for simple fields

**0.6** -- Oct 19, 2017

* Injectable custom renderers
* Association editor
* Type editor

**0.5** -- Oct 3, 2017

* Render Boolean field as checkbox

**0.4** -- Sep 7, 2017

* In-app topic links in HTML fields

**0.3** -- Jun 30, 2017

**0.2** -- Jun 14, 2017

**0.1** -- Apr 28, 2017

------------
Jörg Richter  
Mar 30, 2020
