# DeepaMehta 5 Topic List

## Example

```html
<dm5-topic-list :topics="resultTopics" empty-text="No Match" @topic-click="myHandler">
```

## Properties

| Property  | Type                                                  | Required               | Description                                  |
| --------  | ----                                                  | --------               | -----------                                  |
| topics    | Array of dm5.Topic or dm5.RelatedTopic, may be empty  | yes                    | Topics to render in the list                 |
| emptyText | String                                                | no, default: "No Data" | Text to display when `topics` array is empty |

## Events

| Event         | Description                              | Argument                                     |
| -----         | -----------                              | --------                                     |
| `topic-click` | When the user clicks a topic in the list | The clicked topic, as in the `topics` array. |

## Version History

**0.14** -- Nov 21, 2019

* Improvements:
    * Add `sort-mode` component attribute to control sort mode (`topic`, `type`, `assoc`) from outside
    * Emit `sort-change` event when user changes the sort mode

**0.13** -- Jul 22, 2019

* Chore:
    * Adapt "assoc def" -> "comp def" wording in messages
    * Change license to `AGPL-3.0`

**0.12** -- May 27, 2019

* Improvements:
    * Render topic icons with configured color
* Fixes:
    * Render HTML topic values (instead displaying source)
    * Add max-width to images embedded in HTML topic values

**0.11** -- Apr 1, 2019

* Emit `icon-click` event
* Refactor component templates

**0.10** -- Mar 2, 2019

* Add `topics` prop validator

**0.9** -- Jan 29, 2019

* Change license to `GPL-3.0-or-later`

**0.8** -- Dec 21, 2018

* Fix sorting of number and boolean topic values

**0.7** -- Nov 24, 2018

* Fix: sort topics within groups

**0.6** -- Nov 7, 2018

* Improvement: new component attribute `no-sort-menu` allows hiding the sort menu
* Fix: no endless recursion while calculating topic groups

**0.5** -- Oct 21, 2018

* Fix: render Font Awesome icons with font-smoothing

**0.4** -- Oct 6, 2018

* Feature: new component attribute `marker-ids` allows rendering certain topics as "marked"

**0.3** -- Jul 31, 2018

* Add GitLab CI/CD

**0.2** -- Mar 25, 2018

* Renders plain `Topic`s as well (besides `RelatedTopic`s)
* New prop `empty-text` allows customization of the "No Data" text

**0.1** -- Mar 22, 2018

* Factored out as a standalone component from:  
  https://github.com/jri/dm5-detail-panel

------------
Jörg Richter  
Nov 21, 2019
