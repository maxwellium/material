angular.module('material.services.aria', [])

.service('$materialAria', [
  '$$rAF',
  '$log',
  AriaService
]);

function AriaService($$rAF, $log) {
  var messageTemplate = 'ARIA: Attribute "%s", required for accessibility, is missing on "%s"';
  var defaultValueTemplate = 'Default value was set: %s="%s".';

  return {
    expect : $$rAF.debounce(expectAttribute),
  };

  /**
   * Check if expected ARIA has been specified on the target element
   * @param element
   * @param attrName
   * @param defaultValue
   */
  function expectAttribute(element, attrName, defaultValue) {

    var node = element[0];
    if (!node.hasAttribute(attrName)) {

      if(!defaultValue){
        defaultValue = element.text().trim();
      }
      var hasDefault = angular.isDefined(defaultValue) && defaultValue.length;

      if (hasDefault) {
        defaultValue = String(defaultValue).trim();
        // $log.warn(messageTemplate + ' ' + defaultValueTemplate,
        //           attrName, getTagString(node), attrName, defaultValue);
        element.attr(attrName, defaultValue);
      } else {
        $log.warn(messageTemplate, attrName, getTagString(node));
        $log.warn(node);
      }
    }
  }


  /**
   * Gets the tag definition from a node's outerHTML
   * @example getTagString(
   *   '<material-button foo="bar">Hello</material-button>'
   * ) // => '<material-button foo="bar">'
   */
  function getTagString(node) {
    var html = node.outerHTML;
    var closingIndex = html.indexOf('>');
    return html.substring(0, closingIndex + 1);
  }
}
