from Builder import Builder

copyright = '(C) UtgDev'
minified = 'JSONPageBuilder'
jsfolder = ['/js/libs/jquery', '/js/libs', '/js/libs/bootstrap', '/js/libs/moment','/js/libs/moment/extensions','/js/helpers','/js/fixtures', '/js/libs/rickshaw','/js/pagebuilder','/js/pagebuilder/extensions', '/js']
removeTemp = False
debug = True

builder = Builder(copyright, minified, jsfolder, removeTemp, debug)
builder.build()