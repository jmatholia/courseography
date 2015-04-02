{-# LANGUAGE OverloadedStrings, DeriveDataTypeable, DeriveGeneric  #-}

module DrawResponse where

import           Text.Blaze ((!))
import qualified Text.Blaze.Html5 as H
import qualified Text.Blaze.Html5.Attributes as A
import Happstack.Server
import MakeElements
import MasterTemplate
import Scripts

import qualified Data.ByteString.Lazy.Char8 as L
import Happstack.Server.Types
import Control.Monad.IO.Class (liftIO)
import Data.Aeson as Aeson
import Data.Maybe
import Database.Tables
-- import SvgParsing.parser -- commandline arguments?
import GHC.Generics

import Data.Data (Data, Typeable)

-- easiest to serialize/deserialize objects
data Unit = Unit { x :: Int, y :: Int } deriving (Show, Eq, Data, Typeable, Generic)

instance FromJSON Unit
instance ToJSON Unit
instance FromJSON Units
instance ToJSON Units

drawResponse :: ServerPart Response
drawResponse =
   ok $ toResponse $
    masterTemplate "Courseography - Draw!"
                [H.meta ! A.name "keywords"
                        ! A.content "",
                 drawLinks
                ]
                (do
                    header "draw"
                    drawHtml
                    modePanel
                )
                drawScripts


drawHtml :: H.Html
drawHtml = createTag H.div "about-div" "" "Draw a Graph"


modePanel :: H.Html
modePanel = createTag H.div "side-panel-wrap" "" $ do
    createTag H.div "mode-panel" "" $ do 
    createTag H.div "node-mode" "mode clicked" "NODE (n)"
    H.input ! A.id "course-code" ! A.class_ "course-code" ! A.name "course-code" ! A.placeholder "Course Code" ! A.autocomplete "off" ! A.type_ "text" ! A.size "10"
    createTag H.div "add-text" "button" "ADD"
    createTag H.div "red" "colour clicked" "RED"
    createTag H.div "green" "colour" "GREEN"
    createTag H.div "blue" "colour" "BLUE"
    createTag H.div "purple" "colour" "PURPLE"
    createTag H.div "path-mode" "mode" "PATH (p)" 
    createTag H.div "region-mode" "mode" "REGION (r)"
    createTag H.div "finish-region" "button" "finish (f)" 
    createTag H.div "change-mode" "mode" "SELECT/MOVE (m)" 
    createTag H.div "erase-mode" "mode" "ERASE (e)"
    createTag H.div "save" "button" "SAVE (s)"


-- code from http://stackoverflow.com/questions/8865793/how-to-create-json-rest-api-with-happstack-json-body
-- put this function in a library somewhere
getBody :: ServerPart L.ByteString
getBody = do
    req  <- askRq 
    body <- liftIO $ takeRequestBody req 
    case body of 
        Just rqbody -> return . unBody $ rqbody 
        Nothing     -> return "" 

save :: ServerPart Response
save = do
    body <- getBody -- it's a ByteString
    let unit = fromJust $ Aeson.decode body :: Unit-- how to parse json
    ok $ toResponse $ Aeson.encode unit -- how to send json back. 