@ECHO OFF

cmake -G "NMake Makefiles" -DBOOST_ROOT=%BOOST_ROOT% -DBOOST_LIBRARYDIR=%BOOST_LIBRARYDIR% ..