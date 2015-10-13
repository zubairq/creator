(ns webapp.framework.server.globals
  (:require
   [clojure.core.async                      :refer [chan]]
))



; -----------------------------------------------------------------------
; NOT USED YET
; -----------------------------------------------------------------------
(defonce server-side-cached-records     (atom {}))



; -----------------------------------------------------------------------
; This holds all the query results for the realtime queries
;
;
; -----------------------------------------------------------------------
(defonce server-side-cached-queries     (atom {}))




; -----------------------------------------------------------------------
; The ID of the last server side realtime log item
; -----------------------------------------------------------------------
(defonce server-side-realtime-counter   (atom 0))



; -----------------------------------------------------------------------
; NOT USED YET
; -----------------------------------------------------------------------
(defonce server-side-realtime-clients   (atom {}))



; -----------------------------------------------------------------------
; NOT USED YET
; -----------------------------------------------------------------------
(defonce server-side-record-changes     (chan 1))
